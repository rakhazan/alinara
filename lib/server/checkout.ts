import "server-only";
import { createHmac } from "node:crypto";
import { sql } from "drizzle-orm";
import { withDb } from "@/db/client";
import { rateLimits } from "@/db/schema";
import { type CheckoutInput } from "@/lib/commerce/validation";
export function checkoutConfig() {
  const shipping = Number(process.env.SHIPPING_FLAT_RATE);
  const enabled = process.env.CHECKOUT_ENABLED === "true" && !!process.env.DATABASE_URL && (process.env.AUTH_SECRET?.length ?? 0) >= 32 && process.env.SHIPPING_FLAT_RATE !== undefined && Number.isInteger(shipping) && shipping >= 0 && shipping <= 10000000;
  return { enabled, shipping: enabled ? shipping : 0 };
}
export { CheckoutError } from "@/lib/commerce/order-transaction";
import { CheckoutError, createOrder } from "@/lib/commerce/order-transaction";
export async function placeOrder(input: CheckoutInput, ip: string) {
  const config = checkoutConfig();
  if (!config.enabled) throw new CheckoutError("Pemesanan belum tersedia.");
  const rateKey = createHmac("sha256", process.env.AUTH_SECRET!).update(`checkout:${ip}`).digest("hex");
  return withDb(async (db) => {
    // Count attempts outside the order transaction, including failed stock checks.
    const [limit] = await db.insert(rateLimits).values({ key: rateKey, attempts: 1, resetsAt: new Date(Date.now() + 600000) }).onConflictDoUpdate({ target: rateLimits.key, set: { attempts: sql`case when ${rateLimits.resetsAt} < now() then 1 else ${rateLimits.attempts} + 1 end`, resetsAt: sql`case when ${rateLimits.resetsAt} < now() then now() + interval '10 minutes' else ${rateLimits.resetsAt} end` } }).returning();
    if (limit.attempts > 10) throw new CheckoutError("Terlalu banyak percobaan. Silakan tunggu 10 menit.");
    return createOrder(db, input, config.shipping);
  });
}
