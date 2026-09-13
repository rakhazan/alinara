import type { JournalArticle } from "../_components/sections/journal";
import type { Testimonial } from "../_components/sections/testimonials";
import type { CommunityPost } from "../_components/sections/community";

// Replace the local placeholders with editorial and community photography.
export const journalArticle: JournalArticle = {
  title: "How to Style: Effortless Draping for Everyday Elegance",
  description: "Tiga inspirasi lilitan pashmina untuk melengkapi gaya harian yang sederhana, nyaman, dan anggun.",
  images: [
    { src: "/images/hero-placeholder-sm.svg", alt: "" },
    { src: "/images/hero-placeholder-sm.svg", alt: "" },
    { src: "/images/hero-placeholder-sm.svg", alt: "" },
  ],
  steps: [
    { title: "Siapkan fondasi", description: "Gunakan inner yang nyaman. Letakkan pashmina di atas kepala dengan satu sisi sedikit lebih panjang, lalu rapikan bagian yang membingkai wajah." },
    { title: "Bentuk drape lembut", description: "Bawa sisi panjang melewati bahu berlawanan. Biarkan kain jatuh secara alami, lalu sesuaikan lipatannya tanpa menarik terlalu kencang." },
    { title: "Rapikan sentuhan akhir", description: "Atur sisi pendek di depan dada dan periksa kenyamanan saat bergerak. Jika diperlukan, gunakan pengait yang sesuai dengan karakter kain." },
  ],
};

// Fictional examples for layout review, explicitly labeled as demo in the section.
export const testimonials: Testimonial[] = [
  { id: "demo-1", name: "Nadia A.", location: "Jakarta", rating: 5, quote: "Warna netralnya mudah dipadukan dengan pakaian sehari-hari. Suka dengan tampilannya yang sederhana dan elegan." },
  { id: "demo-2", name: "Anisa R.", location: "Bandung", rating: 5, quote: "Detail kemasannya terasa istimewa. Menjadi inspirasi hadiah yang cantik untuk orang terdekat." },
  { id: "demo-3", name: "Dina S.", location: "Surabaya", rating: 4, quote: "Pilihan warnanya sesuai dengan gaya saya. Paling suka memadukan nuansa hangat untuk kegiatan akhir pekan." },
];

// Add href for each post once the real community content is available.
export const communityPosts: CommunityPost[] = [
  { id: "slow-morning", image: "/images/hero-placeholder-sm.svg", alt: "", caption: "Slow mornings, soft layers" },
  { id: "city-stroll", image: "/images/hero-placeholder-sm.svg", alt: "", caption: "Langkah kecil, cerita baru" },
  { id: "little-details", image: "/images/hero-placeholder-lg.svg", alt: "", caption: "Keindahan dalam detail" },
  { id: "everyday-muse", image: "/images/hero-placeholder-sm.svg", alt: "", caption: "Your everyday muse" },
];
