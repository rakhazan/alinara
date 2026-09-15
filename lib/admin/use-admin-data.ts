"use client";
import { useSyncExternalStore } from "react";
import { seed, type AdminRecord } from "./data";
const KEY = "alinara-admin-v1";
const EVENT = "alinara-admin-update";
const initial = JSON.stringify(seed);
function snapshot() { try { return localStorage.getItem(KEY) ?? initial; } catch { return initial; } }
function subscribe(callback: () => void) { window.addEventListener(EVENT, callback); window.addEventListener("storage", callback); return () => { window.removeEventListener(EVENT, callback); window.removeEventListener("storage", callback); }; }
function parse(raw: string): Record<string, AdminRecord[]> {
  try {
    const value = JSON.parse(raw);
    return Object.fromEntries(Object.keys(seed).map((key) => [key, Array.isArray(value?.[key]) ? value[key].filter((item: AdminRecord) => item && typeof item.id === "string" && typeof item.title === "string" && ["draft", "published"].includes(item.status) && Object.values(item).every((field) => typeof field === "string")) : seed[key]]));
  } catch { return seed; }
}
export function useAdminData() {
  const data = parse(useSyncExternalStore(subscribe, snapshot, () => initial));
  function save(section: string, record: AdminRecord) {
    const current = parse(snapshot());
    const records = current[section];
    return persist({ ...current, [section]: records.some((item) => item.id === record.id) ? records.map((item) => item.id === record.id ? record : item) : [record, ...records] });
  }
  function remove(section: string, id: string) { const current = parse(snapshot()); return persist({ ...current, [section]: current[section].filter((item) => item.id !== id) }); }
  return { data, save, remove };
}
function persist(data: Record<string, AdminRecord[]>) { try { localStorage.setItem(KEY, JSON.stringify(data)); window.dispatchEvent(new Event(EVENT)); return true; } catch { return false; } }
