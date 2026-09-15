export type Field = { key: string; label: string; type?: "text" | "number" | "textarea" | "url"; required?: boolean };
export type AdminRecord = { id: string; title: string; status: "draft" | "published"; updatedAt: string; [key: string]: string };
export const sections: Record<string, { title: string; description: string; fields: Field[] }> = {
  products: { title: "Produk", description: "Kelola katalog, harga, dan persediaan produk.", fields: [{ key: "price", label: "Harga (Rp)", type: "number", required: true }, { key: "stock", label: "Stok", type: "number", required: true }, { key: "category", label: "Kategori" }, { key: "image", label: "Path / URL gambar" }, { key: "description", label: "Deskripsi", type: "textarea" }] },
  categories: { title: "Kategori", description: "Atur kategori untuk memudahkan penjelajahan koleksi.", fields: [{ key: "description", label: "Deskripsi", type: "textarea" }, { key: "image", label: "Path / URL gambar" }] },
  collections: { title: "Koleksi", description: "Kurasi koleksi unggulan dan cerita di baliknya.", fields: [{ key: "description", label: "Deskripsi", type: "textarea" }, { key: "image", label: "Path / URL gambar" }, { key: "href", label: "Tautan tujuan" }] },
  banners: { title: "Hero & Banner", description: "Susun pesan pembuka dan kampanye halaman utama.", fields: [{ key: "description", label: "Deskripsi", type: "textarea" }, { key: "imageSm", label: "Gambar mobile" }, { key: "imageLg", label: "Gambar desktop" }, { key: "cta", label: "Label CTA" }, { key: "href", label: "Tautan CTA" }] },
  articles: { title: "Journal", description: "Tulis dan kelola inspirasi gaya untuk komunitas.", fields: [{ key: "author", label: "Penulis" }, { key: "image", label: "Path / URL gambar" }, { key: "description", label: "Isi artikel", type: "textarea", required: true }] },
  testimonials: { title: "Testimonial", description: "Tinjau ulasan sebelum ditampilkan kepada pengunjung.", fields: [{ key: "location", label: "Lokasi" }, { key: "rating", label: "Rating (1–5)", type: "number", required: true }, { key: "description", label: "Ulasan", type: "textarea", required: true }] },
  community: { title: "Komunitas", description: "Pilih cerita dan foto untuk galeri Alinara Muse.", fields: [{ key: "image", label: "Path / URL gambar" }, { key: "href", label: "URL post", type: "url" }, { key: "description", label: "Caption", type: "textarea" }] },
};
export const seed: Record<string, AdminRecord[]> = Object.fromEntries(Object.keys(sections).map((key) => [key, []]));
const record = (id: string, title: string, extra: Record<string, string> = {}): AdminRecord => ({ id, title, status: "draft", updatedAt: "2026-09-15T00:00:00.000Z", ...extra });
seed.products = [record("p1", "Mulberry Silk Pashmina", { price: "245000", stock: "24", category: "Pashmina" }), record("p2", "Voal Lasercut Series", { price: "189000", stock: "18", category: "Square Scarves" })];
seed.categories = [record("c1", "Pashmina"), record("c2", "Square Scarves")];
seed.collections = [record("f1", "The Signature Silk", { description: "Kelembutan dalam setiap helai." })];
seed.banners = [record("b1", "Welcome to Alinara Butique", { imageSm: "/images/hero-placeholder-sm.svg", imageLg: "/images/hero-placeholder-lg.svg" })];
seed.articles = [record("a1", "Effortless Draping", { author: "Tim Alinara", description: "Inspirasi gaya sehari-hari." })];
