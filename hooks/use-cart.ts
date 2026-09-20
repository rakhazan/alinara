"use client";

import { useSyncExternalStore } from "react";
import { useCatalog } from "@/components/providers/catalog-provider";
import type { Product } from "@/lib/catalog/types";

const KEY = "alinara-cart-v1";
const EVENT = "alinara-cart-change";
type Entry = { id: string; color: string; quantity: number };
function snapshot() { try { return localStorage.getItem(KEY) ?? "[]"; } catch { return "[]"; } }
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(EVENT, callback); };
}
function read(raw: string, products: Product[]): Entry[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const seen = new Set<string>();
    return parsed.filter((entry): entry is Entry => {
      if (!entry || typeof entry.id !== "string" || typeof entry.color !== "string" || !Number.isInteger(entry.quantity) || entry.quantity < 1 || entry.quantity > 99) return false;
      const product = products.find((item) => item.id === entry.id);
      const key = `${entry.id}:${entry.color}`;
      if (!product?.colors.some((color) => color.name === entry.color) || seen.has(key)) return false;
      seen.add(key); return true;
    });
  } catch { return []; }
}
function write(entries: Entry[]) {
  try { localStorage.setItem(KEY, JSON.stringify(entries)); window.dispatchEvent(new Event(EVENT)); return true; }
  catch { return false; }
}
export function useCart() {
  const products = useCatalog();
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  const items = read(raw, products).map((entry) => ({ ...entry, product: products.find((item) => item.id === entry.id)! }));
  return {
    items,
    clear() { return write([]); },
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    total: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    add(id: string, color: string, quantity: number) {
      if (!read(JSON.stringify([{ id, color, quantity }]), products).length) return false;
      const entries = read(snapshot(), products);
      const existing = entries.find((item) => item.id === id && item.color === color);
      return write([...entries.filter((item) => item !== existing), { id, color, quantity: Math.min(99, quantity + (existing?.quantity ?? 0)) }]);
    },
    update(id: string, color: string, quantity: number) {
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) return false;
      return write(read(snapshot(), products).map((item) => item.id === id && item.color === color ? { ...item, quantity } : item));
    },
    remove(id: string, color: string) { return write(read(snapshot(), products).filter((item) => item.id !== id || item.color !== color)); },
  };
}
export const formatRupiah = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
