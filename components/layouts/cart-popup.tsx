"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBasket01Icon } from "@hugeicons/core-free-icons";
import { HIcon } from "@/components/ui/icon";
import Button from "@/components/ui/button";
import { useCart, formatRupiah } from "@/hooks/use-cart";

export default function CartPopup() {
  const { items, count, total } = useCart();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) { if (!root.current?.contains(event.target as Node)) setOpen(false); }
    function escape(event: KeyboardEvent) { if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); } }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open]);
  return <div ref={root} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <Button ref={trigger} variant="ghost" size="icon" className="relative rounded-full" aria-label={`Keranjang, ${count} barang`} aria-expanded={open} aria-controls="cart-preview" onClick={() => setOpen(!open)}><HIcon icon={ShoppingBasket01Icon} className="size-5 lg:size-6" />{count > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 text-[10px] text-on-primary">{count > 99 ? "99+" : count}</span>}</Button>
    {open && <section id="cart-preview" aria-label="Ringkasan keranjang" className="absolute right-0 top-full z-50 mt-5 w-[min(380px,calc(100vw-2rem))] rounded-2xl border border-outline-variant bg-surface p-5 shadow-xl">
      <div className="flex items-center justify-between"><h2 className="font-display text-xl">Keranjang Anda</h2><Button variant="ghost" size="icon" aria-label="Tutup keranjang" onClick={() => { setOpen(false); trigger.current?.focus(); }}>×</Button></div>
      {!items.length ? <p className="py-8 text-sm text-on-surface-variant">Keranjang masih kosong. Temukan karya favorit Anda.</p> : <><p className="mt-2 text-xs text-on-surface-variant">3 item terakhir ditambahkan</p><ul className="my-4 max-h-[45dvh] divide-y divide-outline-variant overflow-y-auto">{items.slice(-3).reverse().map((item) => <li key={`${item.id}:${item.color}`} className="py-3"><Link href={`/products/${item.id}`} onClick={() => setOpen(false)} className="flex gap-3"><Image src={item.product.image} alt="" width={56} height={72} className="rounded object-cover" /><div><p className="text-sm font-medium">{item.product.title}</p><p className="mt-1 text-xs text-on-surface-variant">{item.color} · {item.quantity} pcs</p><p className="mt-1 text-sm">{formatRupiah(item.product.price * item.quantity)}</p></div></Link></li>)}</ul><p className="mb-4 flex justify-between text-sm font-semibold"><span>Subtotal</span><span>{formatRupiah(total)}</span></p></>}
      <Link href="/cart" onClick={() => setOpen(false)} className="block rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-on-primary">Lihat Semua ({count})</Link>
    </section>}
  </div>;
}
