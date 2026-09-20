import { and, eq } from "drizzle-orm";
import { withDb } from "@/db/client";
import { products, content } from "@/db/schema";
import { isAdmin } from "@/lib/server/auth";
import { readJson, sameOrigin } from "@/lib/server/http";
import { parseAdminRecord } from "@/lib/commerce/admin-validation";
import { sections } from "@/lib/admin/data";
import { colorsSchema } from "@/lib/commerce/validation";
type Context = { params: Promise<{ section: string }> };
export async function POST(request: Request, { params }: Context) {
  if (!sameOrigin(request) || !await isAdmin()) return Response.json({ error: "Akses ditolak." }, { status: 403 });
  if (!process.env.DATABASE_URL) return Response.json({ error: "Database belum tersedia." }, { status: 503 });
  const { section } = await params;
  if (!Object.hasOwn(sections, section)) return new Response(null, { status: 404 });
  let record: Record<string, string>;
  try { record = parseAdminRecord(section, await readJson(request)); } catch { return Response.json({ error: "Periksa isian: nama warna harus unik, angka tidak boleh negatif, dan gambar menggunakan path lokal." }, { status: 400 }); }
  try {
    await withDb(async (db) => {
      if (section === "products") {
        const value = { id: record.id, title: record.title, category: record.category, description: record.description, image: record.image || "/images/hero-placeholder-sm.svg", price: Number(record.price), stock: Number(record.stock), colors: colorsSchema.parse(JSON.parse(record.colors)), status: record.status as "draft" | "published", updatedAt: new Date() };
        await db.insert(products).values(value).onConflictDoUpdate({ target: products.id, set: value });
      } else {
        const { id, title, status, updatedAt: _updatedAt, ...fields } = record;
        void _updatedAt;
        const value = { id, title, section, status: status as "draft" | "published", fields, updatedAt: new Date() };
        await db.insert(content).values(value).onConflictDoUpdate({ target: content.id, set: value, setWhere: eq(content.section, section) });
      }
    });
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "Data gagal disimpan. Coba lagi." }, { status: 500 }); }
}
export async function DELETE(request: Request, { params }: Context) {
  if (!sameOrigin(request) || !await isAdmin()) return Response.json({ error: "Akses ditolak." }, { status: 403 });
  if (!process.env.DATABASE_URL) return new Response(null, { status: 503 });
  const { section } = await params;
  if (!Object.hasOwn(sections, section)) return new Response(null, { status: 404 });
  try {
    const { id } = await readJson(request, 1000) as { id: string };
    if (typeof id !== "string") return new Response(null, { status: 400 });
    await withDb(async (db) => { if (section === "products") await db.update(products).set({ status: "draft", updatedAt: new Date() }).where(eq(products.id, id)); else await db.delete(content).where(and(eq(content.id, id), eq(content.section, section))); });
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "Data gagal dihapus." }, { status: 500 }); }
}
