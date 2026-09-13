import type { FeaturedCollection } from "../_components/sections/featured-collections";
import type { PopularProduct } from "../_components/sections/popular-products";

// Demo content: replace images, prices and ratings with catalog data before publishing.
// Add href when collection and product detail routes are available.
export const featuredCollections: FeaturedCollection[] = [
  { id: "signature", title: "The Signature Silk", label: "Kelembutan dalam setiap helai", description: "Jatuh yang anggun, kilau yang halus. Temukan keindahan sederhana dalam koleksi sutra pilihan.", image: "/images/hero-placeholder-sm.svg" },
  { id: "everyday", title: "Everyday Elegance", label: "Untuk setiap hari", description: "Ringan dan nyaman, dari pagi yang tenang hingga sore yang hangat.", image: "/images/hero-placeholder-lg.svg" },
  { id: "occasion", title: "Moments to Remember", label: "Momen istimewa", description: "Sentuhan akhir yang berkesan untuk hari yang layak dirayakan.", image: "/images/hero-placeholder-lg.svg" },
];

export const popularProducts: PopularProduct[] = [
  { id: "mulberry-silk", title: "Mulberry Silk Pashmina", category: "Pashmina", image: "/images/hero-placeholder-sm.svg", price: 245000, rating: 4.9, reviewCount: 142, badge: "Signature Silk", colors: [{ name: "Champagne Sand", value: "#e8dcc6" }, { name: "Soft Beige", value: "#cdb39e" }, { name: "Mocha", value: "#605048" }] },
  { id: "voal-lasercut", title: "Voal Lasercut Series", category: "Square Scarves", image: "/images/hero-placeholder-sm.svg", price: 189000, rating: 4.9, reviewCount: 310, badge: "Terlaris", colors: [{ name: "Soft Taupe Warm", value: "#bca99c" }, { name: "Ivory", value: "#e0d8ce" }, { name: "Warm Stone", value: "#928177" }] },
  { id: "plisse-shawl", title: "Plissé Shawl Satin", category: "Pashmina", image: "/images/hero-placeholder-sm.svg", price: 215000, rating: 4.8, reviewCount: 98, colors: [{ name: "Espresso Deep Noir", value: "#392a23" }, { name: "Dusty Taupe", value: "#a3897b" }, { name: "Cream", value: "#e5dace" }] },
  { id: "monogram-voal", title: "Monogram Printed Voal", category: "Square Scarves", image: "/images/hero-placeholder-sm.svg", price: 265000, rating: 5, reviewCount: 86, badge: "Edisi Terbatas", colors: [{ name: "Rose Dust Motif", value: "#c9a295" }, { name: "Sage Stone", value: "#aaa291" }, { name: "Pearl", value: "#e2d8ce" }] },
];
