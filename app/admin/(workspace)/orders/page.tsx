import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/server/auth";
import { withDb } from "@/db/client";
import { orders, orderItems } from "@/db/schema";
import { PageHeader } from "@/components/admin/ui";
import OrderActions from "./order-actions";
export default async function Page() {
  if (!await isAdmin()) redirect("/admin/login");
  const data = process.env.DATABASE_URL ? await withDb(async (db) => { const rows = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(100); return Promise.all(rows.map(async (row) => ({ ...row, items: await db.select().from(orderItems).where(eq(orderItems.orderId, row.id)) }))); }) : [];
  return <><PageHeader title="Pesanan" description="Tinjau 100 pesanan terbaru. Konfirmasi berarti diterima admin, bukan bukti pembayaran." />{!data.length && <p className="rounded-xl bg-white p-8">Belum ada pesanan.</p>}<div className="space-y-5">{data.map((order) => <article key={order.id} className="rounded-xl border border-outline-variant bg-white p-6"><div className="flex flex-wrap justify-between gap-4"><h2 className="font-semibold">{order.reference}</h2><span>{order.status}</span></div><p className="mt-4 text-sm">{order.name} · {order.email} · {order.phone}</p><p className="mt-2 text-sm">{order.address}, {order.city}, {order.postalCode}</p><ul className="my-4 text-sm">{order.items.map((item) => <li key={item.id}>{item.title} / {item.color} × {item.quantity}</li>)}</ul><p className="font-semibold">Rp {order.total.toLocaleString("id-ID")}</p><OrderActions id={order.id} status={order.status} /></article>)}</div></>;
}
