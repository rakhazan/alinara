import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/server/catalog";
import ProductDetail from "./product-detail";
import ProductReviews from "./product-reviews";
import RelatedProducts from "./related-products";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const popularProducts = await getProducts();
  const { slug } = await params;
  const product = popularProducts.find((item) => item.id === slug);
  return { title: product ? `${product.title} | Alinara` : "Produk tidak ditemukan | Alinara" };
}

export default async function ProductPage({ params }: Props) {
  const popularProducts = await getProducts();
  const { slug } = await params;
  const product = popularProducts.find((item) => item.id === slug);
  if (!product) notFound();
  return (
    <div className="bg-surface px-4 py-8 text-on-surface lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-on-surface-variant">
          <ol className="flex flex-wrap gap-2"><li><Link href="/" className="hover:underline">Beranda</Link></li><li aria-hidden="true">/</li><li><Link href="/#popular-heading" className="hover:underline">Koleksi</Link></li><li aria-hidden="true">/</li><li aria-current="page">{product.title}</li></ol>
        </nav>
        <ProductDetail key={product.id} product={product} />
        {!process.env.DATABASE_URL && <ProductReviews key={`reviews-${product.id}`} reviews={[
          { id: `${product.id}-1`, name: "Nadia A.", rating: 5, title: "Pilihan warna yang cantik", text: `Suka dengan pilihan warna ${product.title}. Mudah dipadukan dengan gaya sehari-hari.` },
          { id: `${product.id}-2`, name: "Anisa R.", rating: 5, title: "Tampilan yang elegan", text: "Desainnya sederhana dan memberi sentuhan yang istimewa pada penampilan." },
          { id: `${product.id}-3`, name: "Dina S.", rating: 4, title: "Menjadi pilihan favorit", text: "Senang mencoba koleksi ini. Berharap akan ada lebih banyak pilihan warna berikutnya." },
        ]} />}
        <RelatedProducts products={popularProducts.filter((item) => item.id !== product.id).sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))} />
      </div>
    </div>
  );
}
