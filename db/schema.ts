import { sql } from "drizzle-orm";
import { pgTable, text, integer, timestamp, jsonb, uuid, check, index, uniqueIndex } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull().default(""),
  description: text("description").notNull().default(""),
  image: text("image").notNull(),
  price: integer("price").notNull(),
  stock: integer("stock").notNull().default(0),
  colors: jsonb("colors").$type<{ name: string; value: string }[]>().notNull(),
  status: text("status", { enum: ["draft", "published"] }).notNull().default("draft"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [check("price_nonnegative", sql`${table.price} >= 0`), check("stock_nonnegative", sql`${table.stock} >= 0`), check("product_status_valid", sql`${table.status} in ('draft', 'published')`), index("products_status_idx").on(table.status)]);

export const content = pgTable("content", {
  id: text("id").primaryKey(),
  section: text("section").notNull(),
  title: text("title").notNull(),
  status: text("status", { enum: ["draft", "published"] }).notNull().default("draft"),
  fields: jsonb("fields").$type<Record<string, string>>().notNull().default({}),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [index("content_section_idx").on(table.section, table.status), check("content_status_valid", sql`${table.status} in ('draft', 'published')`)]);

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  reference: text("reference").notNull(),
  idempotencyKey: uuid("idempotency_key").notNull(),
  requestHash: text("request_hash").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  postalCode: text("postal_code").notNull(),
  subtotal: integer("subtotal").notNull(),
  shipping: integer("shipping").notNull(),
  total: integer("total").notNull(),
  status: text("status", { enum: ["pending", "confirmed", "shipped", "cancelled"] }).notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [uniqueIndex("orders_idempotency_idx").on(table.idempotencyKey), uniqueIndex("orders_reference_idx").on(table.reference), check("order_status_valid", sql`${table.status} in ('pending', 'confirmed', 'shipped', 'cancelled')`)]);

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  title: text("title").notNull(),
  color: text("color").notNull(),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull(),
}, (table) => [index("order_items_order_idx").on(table.orderId), check("quantity_positive", sql`${table.quantity} > 0`)]);

export const rateLimits = pgTable("rate_limits", {
  key: text("key").primaryKey(),
  attempts: integer("attempts").notNull().default(1),
  resetsAt: timestamp("resets_at", { withTimezone: true }).notNull(),
});
