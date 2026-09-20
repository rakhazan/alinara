import Reveal from "@/components/providers/reveal";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";
import CatalogProvider from "@/components/providers/catalog-provider";
import { getProducts } from "@/lib/server/catalog";
export const dynamic = "force-dynamic";
export default async function PublicLayout({ children }: { children: React.ReactNode }) { return <CatalogProvider products={await getProducts()}><Navbar /><Reveal><main className="grow">{children}</main></Reveal><Footer /></CatalogProvider>; }
