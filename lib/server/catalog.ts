import "server-only";
import { cache } from "react";
import { eq, and, desc } from "drizzle-orm";
import { withDb } from "@/db/client";
import { products, content } from "@/db/schema";
import { popularProducts } from "@/app/(public)/_data/collections";
import type { Product } from "@/lib/catalog/types";
export const getProducts = cache(async (): Promise<Product[]> => {
  if (!process.env.DATABASE_URL) return popularProducts;
  return withDb(async (db) => (await db.select().from(products).where(eq(products.status, "published"))).map((item) => ({ ...item, href: `/products/${item.id}`, rating: 0, reviewCount: 0 })));
});
export const getContent = cache(async (section: string) => {
  if (!process.env.DATABASE_URL) return null;
  return withDb((db) => db.select().from(content).where(and(eq(content.section, section), eq(content.status, "published"))).orderBy(desc(content.updatedAt)));
});
