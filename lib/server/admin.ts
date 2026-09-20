import "server-only";
import { desc } from "drizzle-orm";
import { withDb } from "@/db/client";
import { content, products } from "@/db/schema";
import { sections, type AdminRecord } from "@/lib/admin/data";
export async function getAdminData(): Promise<Record<string, AdminRecord[]>> {
  return withDb(async (db) => {
    const [catalog, entries] = await Promise.all([db.select().from(products).orderBy(desc(products.updatedAt)), db.select().from(content).orderBy(desc(content.updatedAt))]);
    const data: Record<string, AdminRecord[]> = Object.fromEntries(Object.keys(sections).map((section) => [section, []]));
    data.products = catalog.map((item) => ({ id: item.id, title: item.title, status: item.status, updatedAt: item.updatedAt.toISOString(), price: String(item.price), stock: String(item.stock), description: item.description, category: item.category, image: item.image, colors: JSON.stringify(item.colors) }));
    for (const entry of entries) if (data[entry.section]) data[entry.section].push({ ...entry.fields, id: entry.id, title: entry.title, status: entry.status, updatedAt: entry.updatedAt.toISOString() });
    return data;
  });
}
