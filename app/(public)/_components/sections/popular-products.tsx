"use client";

import { MotionSurface, MotionFeedback, MotionEntrance } from "@/components/ui/motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ColorPicker } from "@/components/ui/color-picker";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HIcon } from "@/components/ui/icon";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

export type { Product as PopularProduct } from "@/lib/catalog/types";
import type { Product as PopularProduct } from "@/lib/catalog/types";

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function ProductCard({ product }: { product: PopularProduct }) {
  const [favorite, setFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  return (
    <MotionSurface className="h-full"><Card className="h-full overflow-hidden border-0">
      <div className="relative aspect-[3/4] bg-surface-container-high">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
        />
        {product.badge && (
          <Badge className="absolute left-2 top-2 max-w-[calc(100%-4rem)] rounded-full bg-primary-container px-3 py-2 text-[10px] uppercase tracking-wide text-on-primary lg:left-4 lg:top-4 lg:text-xs">
            {product.badge}
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Favoritkan ${product.title}`}
          aria-pressed={favorite}
          onClick={() => setFavorite(!favorite)}
          className="absolute right-2 top-2 rounded-full bg-surface text-primary shadow-sm lg:right-4 lg:top-4"
        >
          <MotionFeedback key={String(favorite)} className="inline-flex"><svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-6"
            fill={favorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
          </svg></MotionFeedback>
        </Button>
      </div>
      <div className="p-3 lg:p-5">
        <p className="text-xs text-on-surface-variant lg:text-sm">
          <span aria-hidden="true" className="text-secondary">
            ★{" "}
          </span>
          <span className="font-semibold text-primary">
            {product.reviewCount ? product.rating.toFixed(1) : "Baru"}
          </span>
          <span className="sr-only"> dari 5, </span> ({product.reviewCount}
          <span className="sr-only"> ulasan</span>)
        </p>
        <h3 className="mt-3 font-display text-base text-primary lg:text-xl">
          {product.href ? (
            <Link href={product.href} className="hover:underline">
              {product.title}
            </Link>
          ) : (
            product.title
          )}
        </h3>
        <p
          className="mt-2 min-h-10 text-xs text-on-surface-variant lg:text-sm"
          aria-live="polite"
        >
          {product.colors[selectedColor]?.name}
        </p>
        <ColorPicker colors={product.colors} value={product.colors[selectedColor]?.name} onValueChange={(value) => setSelectedColor(product.colors.findIndex((color) => color.name === value))} label={`Warna ${product.title}`} />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-primary lg:text-xl">
            {rupiah.format(product.price)}
          </p>
          {product.href && (
            <Button asChild variant="ghost" size="icon-sm" className="rounded-full"><Link href={product.href} aria-label={`Lihat ${product.title}`}><HIcon icon={ArrowRight02Icon} className="size-5" /></Link></Button>
          )}
        </div>
      </div>
    </Card></MotionSurface>
  );
}

export default function PopularProducts({
  products,
}: {
  products: PopularProduct[];
}) {
  const [category, setCategory] = useState("Semua");
  const categories = [
    "Semua",
    ...new Set(products.map((product) => product.category)),
  ];
  const visibleProducts = products.filter(
    (product) => category === "Semua" || product.category === category,
  );
  if (!products.length) return null;
  return (
    <section
      aria-labelledby="popular-heading"
      className="bg-surface px-4 py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-[1920px]">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
          ★ Kurasi Signature
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="popular-heading"
            className="font-display text-3xl text-primary lg:text-5xl"
          >
            Karya Terfavorit
          </h2>
          <p aria-live="polite" className="text-sm text-on-surface-variant">
            {visibleProducts.length} Karya Pilihan
          </p>
        </div>
        <Tabs value={category} onValueChange={setCategory} className="mt-8">
          <TabsList aria-label="Kategori produk" className="justify-center">
            {categories.map((item) => <TabsTrigger key={item} value={item}>{item}</TabsTrigger>)}
          </TabsList>
          {categories.map((item) => <TabsContent key={item} value={item}>
            <MotionEntrance className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {products.filter((product) => item === "Semua" || product.category === item).map((product) => <ProductCard key={product.id} product={product} />)}
            </MotionEntrance>
          </TabsContent>)}
        </Tabs>
      </div>
    </section>
  );
}
