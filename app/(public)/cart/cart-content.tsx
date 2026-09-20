"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { QuantityInput } from "@/components/ui/quantity-input";
import { Alert } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import Button from "@/components/ui/button";
import { useCart, formatRupiah } from "@/hooks/use-cart";

export default function CartContent() {
  const { items, count, total, update, remove } = useCart();
  const [error, setError] = useState("");
  function check(success: boolean) { setError(success ? "" : "Perubahan gagal disimpan. Periksa izin penyimpanan browser."); }
  return <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
    <Link href="/#popular-heading" className="text-sm text-secondary">← Lanjutkan belanja</Link>
    <h1 className="mt-6 font-display text-4xl text-primary">Keranjang Anda</h1><p className="mt-3 text-sm text-on-surface-variant">{count} barang pilihan Anda</p>
    {error && <Alert role="alert" variant="destructive" className="mt-4">{error}</Alert>}
    {!items.length ? <Card variant="muted" className="my-12 p-12 text-center"><h2 className="font-display text-2xl">Cerita Anda dimulai di sini</h2><p className="mt-3 text-on-surface-variant">Keranjang masih kosong.</p><Link href="/#popular-heading" className="mt-6 inline-block rounded bg-primary px-6 py-3 text-on-primary">Jelajahi Koleksi</Link></Card> : <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_360px]">
      <ul className="divide-y divide-outline-variant">{items.map((item) => <li key={`${item.id}:${item.color}`} className="flex gap-4 py-6 first:pt-0"><Link href={`/products/${item.id}`} className="shrink-0"><Image src={item.product.image} alt={item.product.title} width={100} height={130} className="rounded-xl object-cover" /></Link><div className="min-w-0 flex-1"><Link href={`/products/${item.id}`} className="font-display text-lg">{item.product.title}</Link><p className="mt-2 text-sm text-on-surface-variant">{item.color}</p><p className="mt-2 text-sm">{formatRupiah(item.product.price)}</p><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><QuantityInput value={item.quantity} onValueChange={(value) => check(update(item.id, item.color, value))} label={item.product.title} /><Button variant="ghost" size="sm" onClick={() => { const ok = remove(item.id, item.color); check(ok); if (ok) toast.success("Produk dihapus dari keranjang."); }}>Hapus</Button></div><p className="mt-3 font-semibold">{formatRupiah(item.product.price * item.quantity)}</p></div></li>)}</ul>
      <aside className="rounded-2xl bg-surface-container-low p-6 lg:sticky lg:top-32"><h2 className="font-display text-2xl">Ringkasan Belanja</h2><p className="mt-6 flex justify-between"><span>Subtotal</span><strong>{formatRupiah(total)}</strong></p><p className="mt-4 text-xs leading-relaxed text-on-surface-variant">Ongkos kirim belum dihitung. Keranjang tersimpan di browser ini; harga final diperiksa saat pemesanan.</p><Link href="/checkout" className="mt-6 block rounded-lg bg-primary px-5 py-3 text-center font-semibold text-on-primary">Lanjutkan Pemesanan</Link><p className="mt-3 text-xs text-on-surface-variant">Pembayaran dilakukan setelah konfirmasi pesanan.</p></aside>
    </div>}
  </div>;
}
