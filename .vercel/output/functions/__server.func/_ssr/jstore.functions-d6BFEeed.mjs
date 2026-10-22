import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jstore.functions-d6BFEeed.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var URL = "https://vfmisbycpufcwfuannpg.supabase.co";
var KEY = "sb_publishable_DLy0Ork86F29lTfxQfOsvw_E9JblYsA";
var headers = {
	apikey: KEY,
	Authorization: `Bearer ${KEY}`,
	"Content-Type": "application/json"
};
async function rest(path, init) {
	const res = await fetch(`${URL}${path}`, {
		...init,
		headers: {
			...headers,
			...init?.headers || {}
		}
	});
	const text = await res.text();
	let body = null;
	if (text) try {
		body = JSON.parse(text);
	} catch {
		body = text;
	}
	return {
		ok: res.ok,
		status: res.status,
		body
	};
}
function errMsg(body) {
	if (body && typeof body === "object" && "message" in body) return String(body.message);
	return "Request failed";
}
async function sbSelect(table, query) {
	const r = await rest(`/rest/v1/${table}?${query}`);
	if (!r.ok) return {
		data: null,
		error: { message: errMsg(r.body) }
	};
	return {
		data: r.body,
		error: null
	};
}
async function sbInsert(table, rows) {
	const r = await rest(`/rest/v1/${table}`, {
		method: "POST",
		headers: { Prefer: "return=representation" },
		body: JSON.stringify(rows)
	});
	if (!r.ok) return {
		data: null,
		error: { message: errMsg(r.body) }
	};
	return {
		data: r.body,
		error: null
	};
}
async function sbUpdate(table, query, patch) {
	const r = await rest(`/rest/v1/${table}?${query}`, {
		method: "PATCH",
		headers: { Prefer: "return=representation" },
		body: JSON.stringify(patch)
	});
	if (!r.ok) return {
		data: null,
		error: { message: errMsg(r.body) }
	};
	return {
		data: r.body,
		error: null
	};
}
async function sbDelete(table, query) {
	const r = await rest(`/rest/v1/${table}?${query}`, {
		method: "DELETE",
		headers: { Prefer: "return=minimal" }
	});
	if (!r.ok) return { error: { message: errMsg(r.body) } };
	return { error: null };
}
async function sbRpc(name, args) {
	const r = await rest(`/rest/v1/rpc/${name}`, {
		method: "POST",
		body: JSON.stringify(args)
	});
	if (!r.ok) return {
		data: null,
		error: { message: errMsg(r.body) }
	};
	return {
		data: r.body,
		error: null
	};
}
async function requireAdmin(password) {
	if (!password || password.length > 200) return false;
	const { data, error } = await sbRpc("verify_admin_password", { p: password });
	return !error && data === true;
}
/** Upload to Supabase Storage when the public `products` bucket exists. */
async function storeImage(image) {
	if (!image) return image ?? "";
	if (!image.startsWith("data:")) return image;
	const m = image.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
	if (!m) return image;
	const bytes = Buffer.from(m[2], "base64");
	if (bytes.length > 18e5) throw new Error("IMAGE_TOO_LARGE");
	const ext = m[1].includes("png") ? "png" : m[1].includes("webp") ? "webp" : "jpg";
	const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
	if ((await fetch(`${URL}/storage/v1/object/products/${path}`, {
		method: "POST",
		headers: {
			apikey: KEY,
			Authorization: `Bearer ${KEY}`,
			"Content-Type": m[1],
			"x-upsert": "true"
		},
		body: bytes
	})).ok) return `${URL}/storage/v1/object/public/products/${path}`;
	if (image.length > 45e4) throw new Error("IMAGE_TOO_LARGE");
	return image;
}
function sumMap(map) {
	return Object.values(map).reduce((a, b) => a + Number(b || 0), 0);
}
async function getProduct(id) {
	const { data, error } = await sbSelect("products", `id=eq.${Number(id)}&select=*`);
	if (error || !Array.isArray(data) || !data[0]) return null;
	return data[0];
}
async function casSize(id, size, expected, nextMap) {
	const filter = new URLSearchParams();
	filter.set("id", `eq.${id}`);
	filter.set("sizes_stock", `cs.${JSON.stringify({ [size]: expected })}`);
	const { data, error } = await sbUpdate("products", filter.toString(), {
		sizes_stock: nextMap,
		stock: sumMap(nextMap)
	});
	if (error) return {
		ok: false,
		error: error.message
	};
	const rows = Array.isArray(data) ? data : [];
	return {
		ok: rows.length > 0,
		error: rows.length ? "" : "conflict"
	};
}
var CITY_FEE = {
	damascus: 0,
	rif_damascus: 1,
	aleppo: 2,
	homs: 2,
	hama: 2,
	latakia: 2,
	tartous: 2
};
async function placeOrderAtomic(input) {
	if (!input.items?.length) return {
		ok: false,
		error: "Empty cart"
	};
	const applied = [];
	async function rollback() {
		for (const step of applied.reverse()) for (let i = 0; i < 4; i++) {
			const row = await getProduct(step.id);
			if (!row) break;
			const map = { ...row.sizes_stock || {} };
			const cur = Number(map[step.size] ?? 0);
			map[step.size] = cur + step.qty;
			if ((await casSize(step.id, step.size, cur, map)).ok) break;
		}
	}
	const priced = [];
	let subtotal = 0;
	try {
		for (const item of input.items) {
			const qty = Math.floor(Number(item.qty));
			const size = String(item.selectedSize || "");
			if (!item.id || qty < 1 || qty > 99 || !size) {
				await rollback();
				return {
					ok: false,
					error: "Invalid item"
				};
			}
			let done = false;
			let price = 0;
			let name = "";
			let cost = 0;
			for (let attempt = 0; attempt < 4 && !done; attempt++) {
				const row = await getProduct(Number(item.id));
				if (!row) {
					await rollback();
					return {
						ok: false,
						error: "Product missing"
					};
				}
				const map = { ...row.sizes_stock || {} };
				const cur = map[size] !== void 0 ? Number(map[size]) : Number(row.stock) || 0;
				if (cur < qty) {
					await rollback();
					return {
						ok: false,
						error: `Out of stock: ${row.name} (${size})`
					};
				}
				map[size] = cur - qty;
				const r = await casSize(row.id, size, cur, map);
				if (r.error && r.error !== "conflict") {
					await rollback();
					return {
						ok: false,
						error: r.error
					};
				}
				if (r.ok) {
					done = true;
					price = Number(row.price) || 0;
					name = row.name;
					cost = Number(row.cost_price) || 0;
					applied.push({
						id: row.id,
						size,
						qty
					});
				}
			}
			if (!done) {
				await rollback();
				return {
					ok: false,
					error: "Stock changed, please retry"
				};
			}
			subtotal += price * qty;
			priced.push({
				id: Number(item.id),
				name,
				price,
				qty,
				selectedSize: size,
				cost_price: cost
			});
		}
		const fee = input.order_type === "POS" ? 0 : CITY_FEE[input.cityId || ""] ?? 0;
		const inserted = await sbInsert("orders", [{
			customer_name: String(input.customer_name || "Customer").slice(0, 120),
			phone: String(input.phone || "-").slice(0, 40),
			address: String(input.address || "").slice(0, 400),
			payment_method: String(input.payment_method || "Cash").slice(0, 80),
			totals: subtotal + fee,
			order_type: input.order_type,
			items: priced,
			status: input.status,
			created_at: (/* @__PURE__ */ new Date()).toISOString()
		}]);
		if (inserted.error) {
			await rollback();
			return {
				ok: false,
				error: inserted.error.message
			};
		}
		return {
			ok: true,
			order: Array.isArray(inserted.data) ? inserted.data[0] : null,
			total: subtotal + fee
		};
	} catch (e) {
		await rollback();
		return {
			ok: false,
			error: e instanceof Error ? e.message : "Order failed"
		};
	}
}
var listPublicProducts_createServerFn_handler = createServerRpc({
	id: "f0a1740ba30207ee180f3443b0fe2f7d9ca8ca4e48c137f3f595cfb0eb205cec",
	name: "listPublicProducts",
	filename: "src/lib/jstore.functions.ts"
}, (opts) => listPublicProducts.__executeServer(opts));
var listPublicProducts = createServerFn({ method: "GET" }).handler(listPublicProducts_createServerFn_handler, async () => {
	const { data, error } = await sbSelect("products", "select=id,name,price,stock,category,image_url,sizes,sizes_stock,is_locked&is_locked=eq.false&order=id.desc");
	if (error || !Array.isArray(data)) return [];
	return data;
});
var unlockPrivate_createServerFn_handler = createServerRpc({
	id: "bfeec7e9bb083850ad321f27a56c7a9a9feae4a4fddd2ecf6d9eb99032ccd0c0",
	name: "unlockPrivate",
	filename: "src/lib/jstore.functions.ts"
}, (opts) => unlockPrivate.__executeServer(opts));
var unlockPrivate = createServerFn({ method: "POST" }).validator((d) => d).handler(unlockPrivate_createServerFn_handler, async ({ data }) => {
	const { data: ok, error } = await sbRpc("verify_private_password", { p: data.password });
	if (error || ok !== true) return {
		ok: false,
		products: []
	};
	const rows = await sbSelect("products", "select=id,name,price,stock,category,image_url,sizes,sizes_stock,is_locked&is_locked=eq.true&order=id.desc");
	return {
		ok: true,
		products: Array.isArray(rows.data) ? rows.data : []
	};
});
var placeOrder_createServerFn_handler = createServerRpc({
	id: "fffaa5a3512e8caa5cf9e257b7f6a15b56842e62b66a71b5fe7b0a0d4df0dcf9",
	name: "placeOrder",
	filename: "src/lib/jstore.functions.ts"
}, (opts) => placeOrder.__executeServer(opts));
var placeOrder = createServerFn({ method: "POST" }).validator((d) => d).handler(placeOrder_createServerFn_handler, async ({ data }) => placeOrderAtomic(data));
var verifyAdmin_createServerFn_handler = createServerRpc({
	id: "c04db276f6217ebbe6bec794662bc8a72837e77ca03726451dfbaa5d205bbda2",
	name: "verifyAdmin",
	filename: "src/lib/jstore.functions.ts"
}, (opts) => verifyAdmin.__executeServer(opts));
var verifyAdmin = createServerFn({ method: "POST" }).validator((d) => d).handler(verifyAdmin_createServerFn_handler, async ({ data }) => ({ ok: await requireAdmin(data.password) }));
var adminCall_createServerFn_handler = createServerRpc({
	id: "c3011757cbb94dcd6090d4c4693276e97e1e6ff300998d4942f79d7b1a50b0e2",
	name: "adminCall",
	filename: "src/lib/jstore.functions.ts"
}, (opts) => adminCall.__executeServer(opts));
var adminCall = createServerFn({ method: "POST" }).validator((d) => d).handler(adminCall_createServerFn_handler, async ({ data }) => {
	if (!await requireAdmin(data.password)) return {
		data: null,
		error: { message: "Unauthorized" }
	};
	if (data.op === "rpc") {
		const name = data.rpc || "";
		if (name !== "change_admin_password" && name !== "change_private_password") return {
			data: null,
			error: { message: "RPC not allowed" }
		};
		const rpc = await sbRpc(name, data.args || {});
		return {
			data: rpc.data === true,
			error: rpc.error
		};
	}
	const table = data.table;
	if (table !== "products" && table !== "orders") return {
		data: null,
		error: { message: "Bad table" }
	};
	try {
		if (data.op === "select") {
			const selected = await sbSelect(table, data.query || "select=*");
			return {
				data: Array.isArray(selected.data) ? selected.data : [],
				error: selected.error
			};
		}
		if (data.op === "insert") {
			let rows = Array.isArray(data.rows) ? data.rows : [];
			if (data.imageFields) rows = await Promise.all(rows.map(async (row) => {
				const r = { ...row };
				if (typeof r.image_url === "string") r.image_url = await storeImage(r.image_url);
				return r;
			}));
			const inserted = await sbInsert(table, rows);
			return {
				data: Array.isArray(inserted.data) ? inserted.data : [],
				error: inserted.error
			};
		}
		if (data.op === "update") {
			const patch = { ...data.patch || {} };
			if (typeof patch.image_url === "string" && patch.image_url.startsWith("data:")) patch.image_url = await storeImage(patch.image_url);
			const updated = await sbUpdate(table, data.query || "", patch);
			return {
				data: Array.isArray(updated.data) ? updated.data : [],
				error: updated.error
			};
		}
		if (data.op === "delete") return {
			data: null,
			error: (await sbDelete(table, data.query || "")).error
		};
	} catch (e) {
		return {
			data: null,
			error: { message: e instanceof Error ? e.message : "Failed" }
		};
	}
	return {
		data: null,
		error: { message: "Bad op" }
	};
});
//#endregion
export { adminCall_createServerFn_handler, listPublicProducts_createServerFn_handler, placeOrder_createServerFn_handler, unlockPrivate_createServerFn_handler, verifyAdmin_createServerFn_handler };
