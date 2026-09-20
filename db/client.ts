import "server-only";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "./schema";
neonConfig.webSocketConstructor = ws;
// A request-scoped pool supports interactive transactions and is always closed.
export async function withDb<T>(operation: (db: ReturnType<typeof drizzle<typeof schema>>) => Promise<T>): Promise<T> {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_NOT_CONFIGURED");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 3, connectionTimeoutMillis: 10000 });
  try { return await operation(drizzle(pool, { schema })); } finally { await pool.end(); }
}
