import Image from "next/image";
import Link from "next/link";
import type { PopularProduct } from "../../_components/sections/popular-products";

const currency = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });

export default function RelatedProducts({ products }: { products: PopularProduct[] }) {
  if (!products.length) return null;
  return <section aria-labelledby="related-heading" className="mt-20 border-t border-outline-variant pt-12">
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Pilihan untuk Anda</p>
    <h2 id="related-heading" className="font-display text-3xl">Lengkapi Cerita Gaya Anda</h2>
    <p className="mt-3 text-sm text-on-surface-variant">Jelajahi karya lainnya dari koleksi Alinara.</p>
    <ul className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:gap-6">{products.map((product) => <li key={product.id} className="w-[78%] shrink-0 snap-start sm:w-auto"><Link href={`/products/${product.id}`} className="group block h-full overflow-hidden rounded-2xl bg-surface-container-low focus-visible:outline-2 focus-visible:outline-primary"><div className="relative aspect-[3/4] overflow-hidden"><Image src={product.image} alt={product.title} fill sizes="(min-width: 640px) 33vw, 78vw" className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" />{product.badge && <span className="absolute left-3 top-3 rounded-full bg-primary-container px-3 py-2 text-xs text-on-primary">{product.badge}</span>}</div><div className="p-5"><p className="text-xs uppercase tracking-wider text-secondary">{product.category}</p><h3 className="mt-2 font-display text-xl">{product.title}</h3><p className="mt-2 text-xs text-on-surface-variant">{product.colors.length} pilihan warna</p><p className="mt-4 flex justify-between font-semibold">{currency.format(product.price)}<span aria-hidden="true">↗</span></p></div></Link></li>)}</ul>
  </section>;
}
