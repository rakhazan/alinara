import Image from "next/image";
import Link from "next/link";
import { cva } from "class-variance-authority";

export type FeaturedCollection = {
  id: string;
  title: string;
  description: string;
  label: string;
  image: string;
  href?: string;
};

const tileVariants = cva("group relative flex min-h-72 flex-col justify-end overflow-hidden rounded-2xl bg-primary-container p-6 text-on-primary lg:p-8", {
  variants: { layout: { hero: "md:col-span-2 md:row-span-2 md:min-h-[600px]", wide: "md:col-span-2" } },
});

export default function FeaturedCollections({ collections }: { collections: FeaturedCollection[] }) {
  if (!collections.length) return null;
  return (
    <section aria-labelledby="featured-heading" className="bg-surface-container-low px-4 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1920px]">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Featured Collection</p>
        <div className="mb-8 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="featured-heading" className="font-display text-3xl text-primary lg:text-5xl">Koleksi dengan Cerita</h2>
          <p className="max-w-md text-sm leading-relaxed text-on-surface-variant lg:text-base">Tekstur istimewa dan warna bersahaja, dipilih untuk menemani setiap sisi diri Anda.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-4 lg:gap-6">
          {collections.map((collection, index) => {
            const content = <>
              <Image src={collection.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="relative max-w-lg">
                <p className="mb-3 text-xs uppercase tracking-[0.16em]">{collection.label}</p>
                <h3 className="font-display text-2xl lg:text-4xl">{collection.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-on-primary/85">{collection.description}</p>
                {collection.href && <span className="mt-6 inline-flex items-center gap-3 border-b border-on-primary/50 pb-1 text-sm">Jelajahi Koleksi <span aria-hidden="true">→</span></span>}
              </div>
            </>;
            const className = tileVariants({ layout: index === 0 ? "hero" : "wide" });
            return collection.href ? <Link data-scroll-reveal="rise" data-scroll-delay={index * 0.05} key={collection.id} href={collection.href} className={`${className} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary`}>{content}</Link> : <article data-scroll-reveal="rise" data-scroll-delay={index * 0.05} key={collection.id} className={className}>{content}</article>;
          })}
        </div>
      </div>
    </section>
  );
}
