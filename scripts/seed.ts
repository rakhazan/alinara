import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import { products, content } from "../db/schema";
import { popularProducts } from "../app/(public)/_data/collections";
import { seed } from "../lib/admin/data";
if (!process.env.DATABASE_URL) throw new Error("Set DATABASE_URL before seeding.");
neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
try {
  const db = drizzle(pool);
  await db.transaction(async (tx) => {
    for (const product of popularProducts) await tx.insert(products).values({ id: product.id, title: product.title, category: product.category, image: product.image, description: product.description, price: product.price, stock: product.stock, colors: product.colors, status: "draft" }).onConflictDoNothing();
    for (const [section, records] of Object.entries(seed)) if (section !== "products") for (const record of records) {
      const { id, title, status: _status, updatedAt: _updatedAt, ...fields } = record; void _status; void _updatedAt;
      await tx.insert(content).values({ id, section, title, fields, status: "draft" }).onConflictDoNothing();
    }
  });
  console.log("Draft seed records added. Existing records were preserved. Review and publish via admin.");
} finally { await pool.end(); }
