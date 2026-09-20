import type { Metadata } from "next";
import { getProducts } from "@/lib/server/catalog";
import CatalogGrid from "./catalog-grid";
export const metadata: Metadata = { title: "Koleksi | Alinara", description: "Temukan koleksi dan warna pilihan Alinara." };
export default async function Page() { return <CatalogGrid products={await getProducts()} />; }
