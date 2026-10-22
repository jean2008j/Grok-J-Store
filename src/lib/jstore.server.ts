const URL = "https://vfmisbycpufcwfuannpg.supabase.co";
const KEY = "sb_publishable_DLy0Ork86F29lTfxQfOsvw_E9JblYsA";

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  "Content-Type": "application/json",
};

export type SizeMap = Record<string, number>;

export type ProductRow = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image_url: string | null;
  sizes: string[] | null;
  sizes_stock: SizeMap | null;
  cost_price?: number | null;
  is_locked?: boolean | null;
};

async function rest(path: string, init?: RequestInit) {
  const res = await fetch(`${URL}${path}`, {
    ...init,
    headers: { ...headers, ...(init?.headers || {}) },
  });
  const text = await res.text();
  let body: unknown = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }
  return { ok: res.ok, status: res.status, body };
}

function errMsg(body: unknown) {
  if (body && typeof body === "object" && "message" in body) {
    return String((body as { message: unknown }).message);
  }
  return "Request failed";
}

export async function sbSelect(table: string, query: string) {
  const r = await rest(`/rest/v1/${table}?${query}`);
  if (!r.ok) return { data: null as unknown, error: { message: errMsg(r.body) } };
  return { data: r.body, error: null as null };
}

export async function sbInsert(table: string, rows: unknown[]) {
  const r = await rest(`/rest/v1/${table}`, {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(rows),
  });
  if (!r.ok) return { data: null as unknown, error: { message: errMsg(r.body) } };
  return { data: r.body, error: null as null };
}

export async function sbUpdate(table: string, query: string, patch: unknown) {
  const r = await rest(`/rest/v1/${table}?${query}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(patch),
  });
  if (!r.ok) return { data: null as unknown, error: { message: errMsg(r.body) } };
  return { data: r.body, error: null as null };
}

export async function sbDelete(table: string, query: string) {
  const r = await rest(`/rest/v1/${table}?${query}`, {
    method: "DELETE",
    headers: { Prefer: "return=minimal" },
  });
  if (!r.ok) return { error: { message: errMsg(r.body) } };
  return { error: null as null };
}

export async function sbRpc(name: string, args: Record<string, unknown>) {
  const r = await rest(`/rest/v1/rpc/${name}`, {
    method: "POST",
    body: JSON.stringify(args),
  });
  if (!r.ok) return { data: null as unknown, error: { message: errMsg(r.body) } };
  return { data: r.body, error: null as null };
}

export async function requireAdmin(password: string) {
  if (!password || password.length > 200) return false;
  const { data, error } = await sbRpc("verify_admin_password", { p: password });
  return !error && data === true;
}

/** Upload to Supabase Storage when the public `products` bucket exists. */
export async function storeImage(image: string | null | undefined) {
  if (!image) return image ?? "";
  if (!image.startsWith("data:")) return image;
  const m = image.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!m) return image;
  const bytes = Buffer.from(m[2], "base64");
  if (bytes.length > 1_800_000) {
    throw new Error("IMAGE_TOO_LARGE");
  }
  const ext = m[1].includes("png") ? "png" : m[1].includes("webp") ? "webp" : "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const up = await fetch(`${URL}/storage/v1/object/products/${path}`, {
    method: "POST",
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": m[1],
      "x-upsert": "true",
    },
    body: bytes,
  });
  if (up.ok) {
    return `${URL}/storage/v1/object/public/products/${path}`;
  }
  if (image.length > 450_000) throw new Error("IMAGE_TOO_LARGE");
  return image;
}

function sumMap(map: SizeMap) {
  return Object.values(map).reduce((a, b) => a + Number(b || 0), 0);
}

async function getProduct(id: number) {
  const { data, error } = await sbSelect("products", `id=eq.${Number(id)}&select=*`);
  if (error || !Array.isArray(data) || !data[0]) return null;
  return data[0] as ProductRow;
}

async function casSize(
  id: number,
  size: string,
  expected: number,
  nextMap: SizeMap,
) {
  const filter = new URLSearchParams();
  filter.set("id", `eq.${id}`);
  filter.set("sizes_stock", `cs.${JSON.stringify({ [size]: expected })}`);
  const { data, error } = await sbUpdate("products", filter.toString(), {
    sizes_stock: nextMap,
    stock: sumMap(nextMap),
  });
  if (error) return { ok: false as const, error: error.message };
  const rows = Array.isArray(data) ? data : [];
  return { ok: rows.length > 0, error: rows.length ? "" : "conflict" };
}

export type OrderItemIn = {
  id: number;
  qty: number;
  selectedSize: string;
  name?: string;
  price?: number;
};

const CITY_FEE: Record<string, number> = {
  damascus: 0,
  rif_damascus: 1,
  aleppo: 2,
  homs: 2,
  hama: 2,
  latakia: 2,
  tartous: 2,
};

export async function placeOrderAtomic(input: {
  items: OrderItemIn[];
  customer_name: string;
  phone: string;
  address: string;
  payment_method: string;
  order_type: "Online" | "POS";
  status: "pending" | "completed";
  cityId?: string;
}) {
  if (!input.items?.length) return { ok: false as const, error: "Empty cart" };

  const applied: { id: number; size: string; qty: number }[] = [];

  async function rollback() {
    for (const step of applied.reverse()) {
      for (let i = 0; i < 4; i++) {
        const row = await getProduct(step.id);
        if (!row) break;
        const map: SizeMap = { ...(row.sizes_stock || {}) };
        const cur = Number(map[step.size] ?? 0);
        map[step.size] = cur + step.qty;
        const r = await casSize(step.id, step.size, cur, map);
        if (r.ok) break;
      }
    }
  }

  const priced: { id: number; name: string; price: number; qty: number; selectedSize: string; cost_price?: number }[] = [];
  let subtotal = 0;

  try {
    for (const item of input.items) {
      const qty = Math.floor(Number(item.qty));
      const size = String(item.selectedSize || "");
      if (!item.id || qty < 1 || qty > 99 || !size) {
        await rollback();
        return { ok: false as const, error: "Invalid item" };
      }
      let done = false;
      let price = 0;
      let name = "";
      let cost = 0;
      for (let attempt = 0; attempt < 4 && !done; attempt++) {
        const row = await getProduct(Number(item.id));
        if (!row) {
          await rollback();
          return { ok: false as const, error: "Product missing" };
        }
        const map: SizeMap = { ...(row.sizes_stock || {}) };
        const cur = map[size] !== undefined ? Number(map[size]) : Number(row.stock) || 0;
        if (cur < qty) {
          await rollback();
          return { ok: false as const, error: `Out of stock: ${row.name} (${size})` };
        }
        map[size] = cur - qty;
        const r = await casSize(row.id, size, cur, map);
        if (r.error && r.error !== "conflict") {
          await rollback();
          return { ok: false as const, error: r.error };
        }
        if (r.ok) {
          done = true;
          price = Number(row.price) || 0;
          name = row.name;
          cost = Number(row.cost_price) || 0;
          applied.push({ id: row.id, size, qty });
        }
      }
      if (!done) {
        await rollback();
        return { ok: false as const, error: "Stock changed, please retry" };
      }
      subtotal += price * qty;
      priced.push({ id: Number(item.id), name, price, qty, selectedSize: size, cost_price: cost });
    }

    const fee = input.order_type === "POS" ? 0 : CITY_FEE[input.cityId || ""] ?? 0;
    const inserted = await sbInsert("orders", [
      {
        customer_name: String(input.customer_name || "Customer").slice(0, 120),
        phone: String(input.phone || "-").slice(0, 40),
        address: String(input.address || "").slice(0, 400),
        payment_method: String(input.payment_method || "Cash").slice(0, 80),
        totals: subtotal + fee,
        order_type: input.order_type,
        items: priced,
        status: input.status,
        created_at: new Date().toISOString(),
      },
    ]);
    if (inserted.error) {
      await rollback();
      return { ok: false as const, error: inserted.error.message };
    }
    const row = (Array.isArray(inserted.data) ? inserted.data[0] : null) as Record<string, string | number | boolean | null> | null;
    return { ok: true as const, order: row, total: subtotal + fee };
  } catch (e) {
    await rollback();
    return { ok: false as const, error: e instanceof Error ? e.message : "Order failed" };
  }
}
