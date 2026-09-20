import Hero, { type HeroSlide } from "./_components/sections/hero";
import Categories, { type Category } from "./_components/sections/categories";
import FeaturedCollections from "./_components/sections/featured-collections";
import PopularProducts from "./_components/sections/popular-products";
import { getProducts, getContent } from "@/lib/server/catalog";
import { featuredCollections } from "./_data/collections";
import Journal from "./_components/sections/journal";
import Testimonials from "./_components/sections/testimonials";
import Community from "./_components/sections/community";
import { journalArticle, testimonials, communityPosts } from "./_data/editorial";

// Replace placeholder images and add href when category pages are available.
const categories: Category[] = [
  {
    id: "pashmina-silk",
    title: "Pashmina Silk",
    description: "42 Variasi Warna",
    image: "/images/hero-placeholder-sm.svg",
    badge: "Signature",
  },
  {
    id: "voal-ultrafine",
    title: "Voal Ultrafine",
    description: "Tegak Sempurna",
    image: "/images/hero-placeholder-sm.svg",
  },
  {
    id: "satin-scarf",
    title: "Satin Scarf",
    description: "Kilau Mewah Halus",
    image: "/images/hero-placeholder-sm.svg",
  },
  {
    id: "french-khimar",
    title: "French Khimar",
    description: "Syar'i Anggun Modern",
    image: "/images/hero-placeholder-sm.svg",
  },
  {
    id: "peniti-magnet",
    title: "Peniti Magnet",
    description: "Gold & Rose Plated",
    image: "/images/hero-placeholder-sm.svg",
    badge: "Anti-Serat Rusak",
    badgeTone: "accent",
  },
];

// Replace these placeholders with your collection images in public/.
const heroSlides: HeroSlide[] = [
  {
    title: "Welcome to Alinara Butique",
    description: "Kurasi gaya pilihan untuk melengkapi setiap momen Anda.",
    imageSm: "/images/hero-placeholder-sm.svg",
    imageLg: "/images/hero-placeholder-lg.svg",
    // Optional: add cta and href when the destination page is available.
  },
  {
    title: "Kemewahan Bersahaja",
    description:
      "Temukan inspirasi gaya yang nyaman dan elegan untuk keseharian.",
    imageSm: "/images/hero-placeholder-sm.svg",
    imageLg: "/images/hero-placeholder-lg.svg",
  },
];

export default async function Page() {
  const [popularProducts, banners, categoryRows, collectionRows, articleRows, reviewRows, communityRows] = await Promise.all([
    getProducts(), getContent("banners"), getContent("categories"), getContent("collections"), getContent("articles"), getContent("testimonials"), getContent("community"),
  ]);
  const placeholder = "/images/hero-placeholder-sm.svg";
  const slides = banners?.map((row) => ({ title: row.title, description: row.fields.description || "", imageSm: row.fields.imageSm || placeholder, imageLg: row.fields.imageLg || placeholder, cta: row.fields.cta, href: row.fields.href })) ?? heroSlides;
  const categoryItems = categoryRows?.map((row) => ({ id: row.id, title: row.title, description: row.fields.description || "", image: row.fields.image || placeholder, href: "/products" })) ?? categories;
  const collectionItems = collectionRows?.map((row) => ({ id: row.id, title: row.title, label: "Koleksi Alinara", description: row.fields.description || "", image: row.fields.image || placeholder, href: row.fields.href || "/products" })) ?? featuredCollections;
  const article = articleRows === null ? journalArticle : articleRows[0] ? { title: articleRows[0].title, description: articleRows[0].fields.description || "", images: [{ src: articleRows[0].fields.image || placeholder, alt: "" }], steps: [] } : null;
  const reviews = reviewRows?.map((row) => ({ id: row.id, name: row.title, location: row.fields.location || "", quote: row.fields.description || "", rating: Math.max(1, Math.min(5, Number(row.fields.rating) || 5)) as 1 | 2 | 3 | 4 | 5 })) ?? testimonials;
  const posts = communityRows?.map((row) => ({ id: row.id, image: row.fields.image || placeholder, alt: row.title, caption: row.fields.description || row.title, href: row.fields.href || undefined })) ?? communityPosts;
  return (
    <>
      <Hero slides={slides} />
      <Categories categories={categoryItems} />
      <FeaturedCollections collections={collectionItems} />
      <PopularProducts products={popularProducts} />
      {article && <Journal article={article} />}
      <Testimonials testimonials={reviews} isDemo={reviewRows === null} />
      <Community posts={posts} />
    </>
  );
}
