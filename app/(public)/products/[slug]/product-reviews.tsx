"use client";

import { useState } from "react";
import Button from "@/components/ui/button";

export type ProductReview = { id: string; name: string; rating: number; title: string; text: string };

export default function ProductReviews({ reviews }: { reviews: ProductReview[] }) {
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("default");
  const average = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
  const visible = reviews.filter((review) => !rating || review.rating === rating).sort((a, b) => sort === "highest" ? b.rating - a.rating : sort === "lowest" ? a.rating - b.rating : 0);
  return (
    <section id="product-reviews" aria-labelledby="reviews-heading" className="mt-20 border-t border-outline-variant pt-12">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Cerita Pemilik Alinara</p>
      <h2 id="reviews-heading" className="font-display text-3xl text-primary">Ulasan Produk</h2>
      <p className="mt-3 text-sm text-on-surface-variant">Ulasan di bawah adalah contoh tampilan, bukan ulasan pelanggan asli.</p>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl bg-surface-container-low p-6">
          <p className="text-5xl font-display text-primary">{average.toFixed(1)}<span className="text-base text-on-surface-variant"> / 5</span></p>
          <p className="mt-3 text-sm text-on-surface-variant">Dari {reviews.length} ulasan contoh</p>
          <div className="mt-6 space-y-3">{[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((review) => review.rating === star).length;
            return <div key={star} className="flex items-center gap-3 text-xs"><span className="text-secondary">{star} ★</span><meter min={0} max={reviews.length || 1} value={count} aria-label={`${star} bintang: ${count} ulasan`} className="h-3 flex-1" /><span className="w-4 text-right">{count}</span></div>;
          })}</div>
        </div>
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter rating">{[0, 5, 4, 3, 2, 1].map((star) => <Button key={star} size="sm" variant={rating === star ? "primary" : "outline"} aria-pressed={rating === star} onClick={() => setRating(star)}>{star ? `${star} ★` : "Semua"}</Button>)}</div>
            <label className="text-xs text-on-surface-variant">Urutkan <select value={sort} onChange={(event) => setSort(event.target.value)} className="ml-2 rounded border border-outline-variant bg-surface p-2 text-primary"><option value="default">Default</option><option value="highest">Rating tertinggi</option><option value="lowest">Rating terendah</option></select></label>
          </div>
          <p aria-live="polite" className="mb-4 text-xs text-on-surface-variant">{visible.length ? `${visible.length} ulasan ditampilkan` : "Belum ada ulasan untuk rating ini."}</p>
          <ul className="divide-y divide-outline-variant">{visible.map((review) => <li key={review.id} className="py-6 first:pt-0"><div className="flex items-center justify-between gap-4"><p className="text-sm font-semibold">{review.name}</p><span aria-label={`${review.rating} dari 5 bintang`} className="tracking-wider text-secondary">{"★".repeat(review.rating)}</span></div><h3 className="mt-4 font-display text-xl">{review.title}</h3><p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{review.text}</p></li>)}</ul>
        </div>
      </div>
    </section>
  );
}
