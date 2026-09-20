import { sameOrigin } from "../lib/commerce/origin";
import { describe, expect, test, beforeAll, afterAll } from "bun:test";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import type { NeonDatabase } from "drizzle-orm/neon-serverless";
import { readFile } from "node:fs/promises";
import { products, orders } from "../db/schema";
import { checkoutSchema, groupQuantities } from "../lib/commerce/validation";
import { parseAdminRecord } from "../lib/commerce/admin-validation";
import { createOrder, changeOrderStatus } from "../lib/commerce/order-transaction";
import { eq } from "drizzle-orm";
const input = () => ({ idempotencyKey: crypto.randomUUID(), name: "Rani Test", email: "rani@example.com", phone: "081234567890", address: "Jalan Contoh Nomor 12", city: "Jakarta", postalCode: "12345", items: [{ id: "silk", color: "Ivory", quantity: 2 }] });

describe("validation", () => {
  test("checks external origin behind a reverse proxy and rejects foreign origins", () => {
    expect(sameOrigin(new Request("http://localhost:3000/api", { headers: { Host: "shop.example.com", Origin: "https://shop.example.com" } }))).toBe(true);
    expect(sameOrigin(new Request("http://localhost:3000/api", { headers: { Host: "shop.example.com", Origin: "https://attacker.example" } }))).toBe(false);
    expect(sameOrigin(new Request("http://localhost:3000/api"))).toBe(false);
  });
  test("rejects price injection, fractional quantity and malformed address", () => {
    expect(checkoutSchema.safeParse({ ...input(), price: 1 }).success).toBe(false);
    expect(checkoutSchema.safeParse({ ...input(), items: [{ id: "silk", color: "Ivory", quantity: 1.5 }] }).success).toBe(false);
    expect(checkoutSchema.safeParse({ ...input(), postalCode: "x" }).success).toBe(false);
  });
  test("aggregates stock across color variants in stable lock order", () => {
    expect(groupQuantities([{ id: "b", color: "X", quantity: 2 }, { id: "a", color: "Y", quantity: 1 }, { id: "b", color: "Z", quantity: 3 }])).toEqual([["a", 1], ["b", 5]]);
  });
  test("blocks unsafe content links and invalid product colors", () => {
    expect(() => parseAdminRecord("community", { id: "x", title: "X", status: "published", href: "javascript:alert(1)" })).toThrow();
    expect(() => parseAdminRecord("products", { id: "x", title: "X", status: "draft", price: "-5", stock: "1", colors: "[]" })).toThrow();
  });
});

describe("PostgreSQL order transaction", () => {
  const client = new PGlite(); const db = drizzle(client);
  const transactionDb = db as unknown as Pick<NeonDatabase<typeof import("@/db/schema")>, "transaction">;
  beforeAll(async () => {
    const migration = await readFile(new URL("../drizzle/0000_military_cable.sql", import.meta.url), "utf8");
    await client.exec(migration);
    await db.insert(products).values({ id: "silk", title: "Silk", image: "/silk.svg", price: 100000, stock: 5, colors: [{ name: "Ivory", value: "#ffffff" }], status: "published" });
  });
  afterAll(() => client.close());
  test("uses server price and retries without duplicate orders or stock deductions", async () => {
    const request = input(); const first = await createOrder(transactionDb, request, 15000); const second = await createOrder(transactionDb, request, 15000);
    expect(first).toEqual(second); expect(first.total).toBe(215000);
    expect((await db.select().from(products))[0].stock).toBe(3);
    expect(await db.select().from(orders)).toHaveLength(1);
    await expect(createOrder(transactionDb, { ...request, name: "Different" }, 15000)).rejects.toThrow("Permintaan berubah");
  });
  test("rolls back if stock insufficient, rejects unavailable colors", async () => {
    await expect(createOrder(transactionDb, { ...input(), items: [{ id: "silk", color: "Ivory", quantity: 4 }] }, 0)).rejects.toThrow("Stok");
    await expect(createOrder(transactionDb, { ...input(), items: [{ id: "silk", color: "Black", quantity: 1 }] }, 0)).rejects.toThrow("warna");
    expect((await db.select().from(products))[0].stock).toBe(3);
    expect(await db.select().from(orders)).toHaveLength(1);
  });
  test("two concurrent orders cannot oversell", async () => {
    const results = await Promise.allSettled([createOrder(transactionDb, input(), 0), createOrder(transactionDb, input(), 0)]);
    expect(results.filter((result) => result.status === "fulfilled")).toHaveLength(1);
    expect((await db.select().from(products).where(eq(products.id, "silk")))[0].stock).toBe(1);
  });
  test("cancellation returns stock exactly once and forbids reopening", async () => {
    const [order] = await db.select().from(orders);
    const before = (await db.select().from(products))[0].stock;
    await changeOrderStatus(transactionDb, order.id, "cancelled");
    await changeOrderStatus(transactionDb, order.id, "cancelled");
    expect((await db.select().from(products))[0].stock).toBe(before + 2);
    await expect(changeOrderStatus(transactionDb, order.id, "confirmed")).rejects.toThrow("status");
  });

});
