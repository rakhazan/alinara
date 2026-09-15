"use client";
import Link from "next/link";
import { useAdminData } from "@/lib/admin/use-admin-data";
import { sections } from "@/lib/admin/data";
import { DataTable, PageHeader, StatCard, StatusBadge } from "./ui";
export default function Overview() {
  const { data } = useAdminData();
  const all = Object.entries(data).flatMap(([section, records]) => records.map((item) => ({ ...item, section, id: `${section}:${item.id}` })));
  return <><PageHeader title="Selamat datang di Studio" description="Kelola karya, kurasi koleksi, dan siapkan cerita berikutnya untuk komunitas Alinara." /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Produk" value={data.products.length} note="Dalam katalog lokal" /><StatCard label="Konten" value={all.length - data.products.length} note="Seluruh modul editorial" /><StatCard label="Draft" value={all.filter((item) => item.status === "draft").length} note="Menunggu peninjauan" /><StatCard label="Published" value={all.filter((item) => item.status === "published").length} note="Status simulasi lokal" /></div><section className="my-8 rounded-2xl bg-primary-container p-7 text-on-primary"><h2 className="font-display text-2xl">Ruang untuk karya berikutnya.</h2><p className="mt-3 text-sm text-on-primary/80">Mulai dari katalog produk atau susun cerita baru di journal.</p><div className="mt-5 flex gap-5 text-sm text-secondary-container"><Link href="/admin/products">Kelola produk ↗</Link><Link href="/admin/articles">Buka journal ↗</Link></div></section><h2 className="mb-4 font-display text-xl">Terakhir Diperbarui</h2><DataTable rows={all.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 6)} columns={[{ label: "Judul", render: (item) => <Link href={`/admin/${item.section}`} className="font-medium hover:underline">{item.title}</Link> }, { label: "Modul", render: (item) => sections[item.section].title }, { label: "Status", render: (item) => <StatusBadge status={item.status} /> }]} /></>;
}
