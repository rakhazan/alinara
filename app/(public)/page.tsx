import Hero, { type HeroSlide } from "./_components/sections/hero";
import Categories, { type Category } from "./_components/sections/categories";
import FeaturedCollections from "./_components/sections/featured-collections";
import PopularProducts from "./_components/sections/popular-products";
import { featuredCollections, popularProducts } from "./_data/collections";
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

export default function Page() {
  return (
    <>
      <Hero slides={heroSlides} />
      <Categories categories={categories} />
      <FeaturedCollections collections={featuredCollections} />
      <PopularProducts products={popularProducts} />
      <Journal article={journalArticle} />
      <Testimonials testimonials={testimonials} isDemo />
      <Community posts={communityPosts} />
    </>
  );
}
