import Link from "next/link";
export default function NotFound() { return <div className="px-5 py-20 text-center"><h1 className="font-display text-3xl">Karya ini belum tersedia</h1><p className="mt-4">Temukan pilihan lainnya dalam koleksi kami.</p><Link className="mt-6 inline-block text-secondary underline" href="/products">Jelajahi Koleksi</Link></div>; }
