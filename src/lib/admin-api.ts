import { adminCall } from "@/lib/jstore.functions";

type Res = { data: any; error: { message: string } | null };

function qEq(col: string, val: unknown) {
  return `${col}=eq.${encodeURIComponent(String(val))}`;
}

export function createAdminApi(password: string) {
  const call = (payload: Record<string, unknown>) =>
    adminCall({ data: { password, ...payload } as never });

  return {
    rpc(name: string, args: Record<string, unknown>) {
      return call({ op: "rpc", rpc: name, args }) as Promise<Res>;
    },
    from(table: "products" | "orders") {
      return {
        select(columns = "*") {
          const pending = call({ op: "select", table, query: `select=${columns}` }) as Promise<Res> & {
            order: (col: string, opts?: { ascending?: boolean }) => Promise<Res>;
          };
          pending.order = (col: string, opts?: { ascending?: boolean }) => {
            const dir = opts?.ascending === false ? "desc" : "asc";
            return call({
              op: "select",
              table,
              query: `select=${columns}&order=${col}.${dir}`,
            }) as Promise<Res>;
          };
          return pending;
        },
        insert(rows: unknown[]) {
          const run = () =>
            call({ op: "insert", table, rows, imageFields: table === "products" }) as Promise<Res>;
          return { select: run };
        },
        update(patch: Record<string, unknown>) {
          return {
            eq(col: string, val: unknown) {
              return call({ op: "update", table, query: qEq(col, val), patch }) as Promise<Res>;
            },
          };
        },
        delete() {
          return {
            eq(col: string, val: unknown) {
              return call({ op: "delete", table, query: qEq(col, val) }) as Promise<Res>;
            },
            in(col: string, vals: unknown[]) {
              const list = vals.map((v) => encodeURIComponent(String(v))).join(",");
              return call({ op: "delete", table, query: `${col}=in.(${list})` }) as Promise<Res>;
            },
          };
        },
      };
    },
  };
}
