"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PopularProduct } from "../../_components/sections/popular-products";

const currency = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });

export default function ProductDetail({ product }: { product: PopularProduct }) {
  const [colorIndex, setColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const images = [product.image, "/images/hero-placeholder-lg.svg"];
  const color = product.colors[colorIndex];

  return (
    <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface-container-high">
          <Image src={images[imageIndex]} alt={`${product.title} — gambar ${imageIndex + 1}`} fill sizes="(min-width: 1024px) 50vw, 100vw" loading="eager" className="object-cover" />
          {product.badge && <span className="absolute left-4 top-4 rounded-full bg-primary-container px-4 py-2 text-xs uppercase tracking-wider text-on-primary">{product.badge}</span>}
          <div className="absolute inset-x-4 bottom-4 flex justify-between">
            <Button variant="outline" size="icon" className="rounded-full bg-surface" aria-label="Gambar sebelumnya" disabled={imageIndex === 0} onClick={() => setImageIndex(imageIndex - 1)}>←</Button>
            <Button variant="outline" size="icon" className="rounded-full bg-surface" aria-label="Gambar berikutnya" disabled={imageIndex === images.length - 1} onClick={() => setImageIndex(imageIndex + 1)}>→</Button>
          </div>
        </div>
        <div className="mt-4 flex gap-3" role="group" aria-label="Pilih gambar produk">{images.map((src, index) => <button key={`${src}-${index}`} type="button" onClick={() => setImageIndex(index)} aria-label={`Tampilkan gambar ${index + 1}`} aria-pressed={imageIndex === index} className={cn("relative size-20 overflow-hidden rounded-lg border-2 focus-visible:outline-2 focus-visible:outline-primary", imageIndex === index ? "border-secondary" : "border-transparent")}><Image src={src} alt="" fill sizes="80px" className="object-cover" /></button>)}</div>
      </div>
      <div className="lg:sticky lg:top-32">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{product.category} · Alinara Signature</p>
        <h1 className="mt-4 font-display text-3xl leading-tight text-primary lg:text-5xl">{product.title}</h1>
        <p className="mt-4 text-sm text-on-surface-variant"><span className="text-secondary">★ {product.rating.toFixed(1)}</span> / 5 · {product.reviewCount} ulasan contoh</p>
        <p className="mt-6 text-2xl font-semibold">{currency.format(product.price)}</p>
        <p className="mt-5 text-sm leading-relaxed text-on-surface-variant">Sentuhan warna hangat untuk melengkapi gaya sehari-hari Anda. Temukan nuansa favorit dan padukan dengan koleksi pribadi Anda.</p>
        <fieldset className="mt-8 border-t border-outline-variant pt-6">
          <legend className="text-sm font-medium">Pilihan warna</legend>
          <p className="mb-3 text-sm text-on-surface-variant" aria-live="polite">{color?.name ?? "Belum tersedia"}</p>
          <div className="flex flex-wrap gap-3">{product.colors.map((item, index) => <label key={item.name} className="cursor-pointer"><input type="radio" name={`color-${product.id}`} value={item.name} checked={colorIndex === index} onChange={() => setColorIndex(index)} className="peer sr-only" /><span className="flex size-11 items-center justify-center rounded-full border border-transparent peer-checked:border-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary"><span className="size-8 rounded-full border border-outline-variant" style={{ backgroundColor: item.value }} /></span><span className="sr-only">{item.name}</span></label>)}</div>
        </fieldset>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div><p className="mb-2 text-sm">Jumlah</p><div className="flex items-center rounded-lg border border-outline-variant"><Button variant="ghost" size="icon" disabled={quantity <= 1} onClick={() => setQuantity(quantity - 1)} aria-label="Kurangi jumlah">−</Button><output className="min-w-10 text-center" aria-live="polite">{quantity}</output><Button variant="ghost" size="icon" disabled={quantity >= 99} onClick={() => setQuantity(quantity + 1)} aria-label="Tambah jumlah">+</Button></div></div>
          <p className="text-right text-sm text-on-surface-variant">Subtotal<span className="mt-2 block text-xl font-semibold text-primary">{currency.format(product.price * quantity)}</span></p>
        </div>
        <div className="mt-6 flex gap-3"><Button size="lg" disabled className="flex-1" aria-describedby="purchase-status">Tambah ke Keranjang</Button><Button variant="outline" size="icon" className="size-12 rounded-sm text-2xl" aria-label="Favoritkan produk" aria-pressed={favorite} onClick={() => setFavorite(!favorite)}>{favorite ? "♥" : "♡"}</Button></div>
        <p id="purchase-status" className="mt-3 text-xs leading-relaxed text-on-surface-variant">Pembelian belum tersedia. Foto, harga, dan ulasan pada halaman ini merupakan data contoh.</p>
        <div className="mt-8 divide-y divide-outline-variant border-y border-outline-variant">
          {[{ title: "Detail Produk", text: `${product.title} tersedia dalam ${product.colors.length} pilihan warna. Informasi bahan dan ukuran akan dilengkapi pada katalog resmi.` }, { title: "Panduan Perawatan", text: "Ikuti petunjuk pada label produk. Panduan perawatan khusus bahan akan tersedia bersama spesifikasi produk." }, { title: "Pengiriman & Pengembalian", text: "Pilihan pengiriman, estimasi waktu, dan ketentuan pengembalian akan tersedia saat layanan pembelian dibuka." }].map((item) => <details key={item.title} className="py-5"><summary className="cursor-pointer text-sm font-semibold">{item.title}</summary><p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{item.text}</p></details>)}
        </div>
      </div>
    </div>
  );
}
