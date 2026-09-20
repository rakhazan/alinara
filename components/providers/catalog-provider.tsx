"use client";
import { createContext, useContext, type ReactNode } from "react";
import type { Product } from "@/lib/catalog/types";
const CatalogContext = createContext<Product[]>([]);
export default function CatalogProvider({ products, children }: { products: Product[]; children: ReactNode }) { return <CatalogContext.Provider value={products}>{children}</CatalogContext.Provider>; }
export function useCatalog() { return useContext(CatalogContext); }
