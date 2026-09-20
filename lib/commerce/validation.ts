import { z } from "zod";
export const colorsSchema = z.array(z.object({ name: z.string().trim().min(1).max(80), value: z.string().regex(/^#[0-9a-fA-F]{6}$/) })).min(1).max(30).refine((colors) => new Set(colors.map((color) => color.name)).size === colors.length, "Nama warna harus unik.");
export const safeHref = z.string().max(1000).refine((value) => value === "" || /^\/(?!\/)/.test(value) || /^https:\/\//.test(value), "Gunakan path lokal atau URL HTTPS.");
export const imagePath = z.string().max(500).refine((value) => value === "" || /^\/(?!\/)/.test(value), "Gunakan path gambar lokal, misalnya /images/foto.jpg.");
export const checkoutSchema = z.object({
  idempotencyKey: z.uuid(),
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  phone: z.string().trim().regex(/^\+?[0-9\s-]{9,20}$/),
  address: z.string().trim().min(10).max(500),
  city: z.string().trim().min(2).max(100),
  postalCode: z.string().regex(/^\d{5}$/),
  items: z.array(z.object({ id: z.string().min(1).max(100), color: z.string().min(1).max(80), quantity: z.number().int().min(1).max(99) })).min(1).max(25),
}).strict();
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export function groupQuantities(items: CheckoutInput["items"]) {
  const totals = new Map<string, number>();
  for (const item of items) totals.set(item.id, (totals.get(item.id) ?? 0) + item.quantity);
  return [...totals.entries()].sort(([a], [b]) => a.localeCompare(b));
}
