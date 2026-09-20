"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBasket01Icon } from "@hugeicons/core-free-icons";
import { HIcon } from "@/components/ui/icon";
import Button from "@/components/ui/button";
import { useCart, formatRupiah } from "@/hooks/use-cart";
import { Popup, PopupTrigger, PopupContent, PopupClose } from "@/components/ui/popup";
import { Item, ItemContent, ItemTitle, ItemDescription } from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
export default function CartPopup() {
  const { items, count, total } = useCart();
  const [open, setOpen] = useState(false);
  return <Popup open={open} onOpenChange={setOpen}>
    <PopupTrigger asChild><Button variant="ghost" size="icon" className="relative rounded-full" aria-label={`Keranjang, ${count} barang`}><HIcon icon={ShoppingBasket01Icon} className="size-5 lg:size-6" />{count > 0 && <Badge className="absolute -right-1 -top-1 px-1.5 text-[10px]">{count > 99 ? "99+" : count}</Badge>}</Button></PopupTrigger>
    <PopupContent align="end" className="w-[380px]" aria-label="Ringkasan keranjang">
      <div className="flex items-center justify-between"><h2 className="font-display text-xl">Keranjang Anda</h2><PopupClose asChild><Button variant="ghost" size="icon" aria-label="Tutup keranjang">×</Button></PopupClose></div>
      {!items.length ? <p className="py-8 text-sm text-on-surface-variant">Keranjang masih kosong. Temukan karya favorit Anda.</p> : <><p className="mt-2 text-xs text-on-surface-variant">{Math.min(3, items.length)} item terakhir ditambahkan</p><ul className="my-4 max-h-[45dvh] divide-y divide-outline-variant overflow-y-auto">{items.slice(-3).reverse().map((item) => <li key={`${item.id}:${item.color}`}><Link href={`/products/${item.id}`} onClick={() => setOpen(false)} className="block rounded-lg hover:bg-surface-container"><Item className="px-0 py-3"><Image src={item.product.image} alt="" width={56} height={72} className="rounded object-cover" /><ItemContent><ItemTitle>{item.product.title}</ItemTitle><ItemDescription>{item.color} · {item.quantity} pcs</ItemDescription><p className="mt-1 text-sm">{formatRupiah(item.product.price * item.quantity)}</p></ItemContent></Item></Link></li>)}</ul><p className="mb-4 flex justify-between text-sm font-semibold"><span>Subtotal</span><span>{formatRupiah(total)}</span></p></>}
      <Link href="/cart" onClick={() => setOpen(false)} className="block rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-on-primary">Lihat Semua ({count})</Link>
    </PopupContent>
  </Popup>;
}
