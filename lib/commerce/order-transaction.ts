import { createHash, randomUUID } from "node:crypto";
import { and, eq, gte, inArray, sql } from "drizzle-orm";
import type { NeonDatabase } from "drizzle-orm/neon-serverless";
import { products, orders, orderItems } from "@/db/schema";
import { groupQuantities, type CheckoutInput } from "./validation";
export class CheckoutError extends Error {}
export async function createOrder(db: Pick<NeonDatabase<typeof import("@/db/schema")>, "transaction">, input: CheckoutInput, shipping: number) {
  const requestHash = createHash("sha256").update(JSON.stringify(input)).digest("hex");
  return db.transaction(async (tx) => {
      await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${input.idempotencyKey}, 0))`);
      const [existing] = await tx.select().from(orders).where(eq(orders.idempotencyKey, input.idempotencyKey));
      if (existing) { if (existing.requestHash !== requestHash) throw new CheckoutError("Permintaan berubah. Muat ulang halaman untuk membuat pesanan baru."); return { reference: existing.reference, total: existing.total }; }
      const quantities = groupQuantities(input.items);
      const catalog = await tx.select().from(products).where(and(inArray(products.id, quantities.map(([id]) => id)), eq(products.status, "published"))).orderBy(products.id).for("update");
      let subtotal = 0;
      const lines = input.items.map((item) => {
        const product = catalog.find((product) => product.id === item.id);
        if (!product || !product.colors.some((color) => color.name === item.color)) throw new CheckoutError("Produk atau warna tidak lagi tersedia. Perbarui keranjang.");
        subtotal += product.price * item.quantity;
        return { productId: product.id, title: product.title, color: item.color, price: product.price, quantity: item.quantity };
      });
      if (subtotal + shipping > 2000000000) throw new CheckoutError("Total pesanan melebihi batas.");
      for (const [id, quantity] of quantities) {
        const updated = await tx.update(products).set({ stock: sql`${products.stock} - ${quantity}`, updatedAt: new Date() }).where(and(eq(products.id, id), gte(products.stock, quantity))).returning({ id: products.id });
        if (!updated.length) throw new CheckoutError("Stok tidak cukup. Kurangi jumlah atau pilih produk lain.");
      }
      const [order] = await tx.insert(orders).values({ reference: `ALN-${randomUUID().replaceAll("-", "").slice(0, 16).toUpperCase()}`, idempotencyKey: input.idempotencyKey, requestHash, name: input.name, email: input.email, phone: input.phone, address: input.address, city: input.city, postalCode: input.postalCode, subtotal, shipping: shipping, total: subtotal + shipping }).returning();
      await tx.insert(orderItems).values(lines.map((line) => ({ ...line, orderId: order.id })));
      return { reference: order.reference, total: order.total };
    });
}

export async function changeOrderStatus(db: Pick<NeonDatabase<typeof import("@/db/schema")>, "transaction">, id: string, status: "confirmed" | "shipped" | "cancelled") {
  return db.transaction(async (tx) => {
    const [order] = await tx.select().from(orders).where(eq(orders.id, id)).for("update");
    if (!order) throw new CheckoutError("Pesanan tidak ditemukan.");
    if (order.status === status) return;
    const allowed: Record<string, string[]> = { pending: ["confirmed", "cancelled"], confirmed: ["shipped", "cancelled"], shipped: [], cancelled: [] };
    if (!allowed[order.status].includes(status)) throw new CheckoutError("Perubahan status tidak diizinkan.");
    if (status === "cancelled") {
      const lines = await tx.select().from(orderItems).where(eq(orderItems.orderId, id)).orderBy(orderItems.productId);
      for (const line of lines) await tx.update(products).set({ stock: sql`${products.stock} + ${line.quantity}`, updatedAt: new Date() }).where(eq(products.id, line.productId));
    }
    await tx.update(orders).set({ status }).where(eq(orders.id, id));
  });
}
