import { createServerFn } from "@tanstack/react-start";
import {
  placeOrderAtomic,
  requireAdmin,
  sbDelete,
  sbInsert,
  sbRpc,
  sbSelect,
  sbUpdate,
  storeImage,
  type OrderItemIn,
} from "./jstore.server";

export type PublicProduct = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image_url: string | null;
  sizes: string[] | null;
  sizes_stock: Record<string, number> | null;
  is_locked?: boolean | null;
  cost_price?: number | null;
};

export const listPublicProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await sbSelect(
    "products",
    "select=id,name,price,stock,category,image_url,sizes,sizes_stock,is_locked&is_locked=eq.false&order=id.desc",
  );
  if (error || !Array.isArray(data)) return [] as PublicProduct[];
  return data as PublicProduct[];
});

export const unlockPrivate = createServerFn({ method: "POST" })
  .validator((d: { password: string }) => d)
  .handler(async ({ data }) => {
    const { data: ok, error } = await sbRpc("verify_private_password", { p: data.password });
    if (error || ok !== true) return { ok: false as const, products: [] as PublicProduct[] };
    const rows = await sbSelect(
      "products",
      "select=id,name,price,stock,category,image_url,sizes,sizes_stock,is_locked&is_locked=eq.true&order=id.desc",
    );
    const products = Array.isArray(rows.data) ? (rows.data as PublicProduct[]) : [];
    return { ok: true as const, products };
  });

export const placeOrder = createServerFn({ method: "POST" })
  .validator((d: {
    items: OrderItemIn[];
    customer_name: string;
    phone: string;
    address: string;
    payment_method: string;
    order_type: "Online" | "POS";
    status: "pending" | "completed";
    cityId?: string;
  }) => d)
  .handler(async ({ data }) => placeOrderAtomic(data));

export const verifyAdmin = createServerFn({ method: "POST" })
  .validator((d: { password: string }) => d)
  .handler(async ({ data }) => ({ ok: await requireAdmin(data.password) }));

export const adminCall = createServerFn({ method: "POST" })
  .validator((d: {
    password: string;
    op: "select" | "insert" | "update" | "delete" | "rpc";
    table?: "products" | "orders";
    query?: string;
    rows?: unknown[];
    patch?: Record<string, unknown>;
    rpc?: string;
    args?: Record<string, unknown>;
    imageFields?: boolean;
  }) => d)
  .handler(async ({ data }) => {
    const allowed = await requireAdmin(data.password);
    if (!allowed) return { data: null as null, error: { message: "Unauthorized" } };

    if (data.op === "rpc") {
      const name = data.rpc || "";
      if (name !== "change_admin_password" && name !== "change_private_password") {
        return { data: null, error: { message: "RPC not allowed" } };
      }
      const rpc = await sbRpc(name, data.args || {});
      return { data: (rpc.data === true) as boolean, error: rpc.error };
    }

    const table = data.table;
    if (table !== "products" && table !== "orders") {
      return { data: null, error: { message: "Bad table" } };
    }

    try {
      if (data.op === "select") {
        const q = data.query || "select=*";
        const selected = await sbSelect(table, q);
        return {
          data: (Array.isArray(selected.data) ? selected.data : []) as {
            id: number;
            [key: string]: string | number | boolean | null | object;
          }[],
          error: selected.error,
        };
      }
      if (data.op === "insert") {
        let rows = Array.isArray(data.rows) ? data.rows : [];
        if (data.imageFields) {
          rows = await Promise.all(
            rows.map(async (row) => {
              const r = { ...(row as Record<string, unknown>) };
              if (typeof r.image_url === "string") r.image_url = await storeImage(r.image_url);
              return r;
            }),
          );
        }
        const inserted = await sbInsert(table, rows);
        return {
          data: (Array.isArray(inserted.data) ? inserted.data : []) as {
            id: number;
            [key: string]: string | number | boolean | null | object;
          }[],
          error: inserted.error,
        };
      }
      if (data.op === "update") {
        const patch = { ...(data.patch || {}) };
        if (typeof patch.image_url === "string" && patch.image_url.startsWith("data:")) {
          patch.image_url = await storeImage(patch.image_url);
        }
        const updated = await sbUpdate(table, data.query || "", patch);
        return {
          data: (Array.isArray(updated.data) ? updated.data : []) as {
            id: number;
            [key: string]: string | number | boolean | null | object;
          }[],
          error: updated.error,
        };
      }
      if (data.op === "delete") {
        const deleted = await sbDelete(table, data.query || "");
        return { data: null, error: deleted.error };
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed";
      return { data: null, error: { message } };
    }
    return { data: null, error: { message: "Bad op" } };
  });
