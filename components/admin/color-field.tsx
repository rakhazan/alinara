"use client";
import { useState } from "react";
import Button from "@/components/ui/button";
import { Input } from "./ui";
function parse(value: string) {
  try { const colors = JSON.parse(value); if (Array.isArray(colors) && colors.length && colors.every((item) => typeof item.name === "string" && /^#[0-9a-fA-F]{6}$/.test(item.value))) return colors as { name: string; value: string }[]; } catch {}
  return [{ name: "", value: "#faf7f2" }];
}
export default function ColorField({ defaultValue }: { defaultValue: string }) {
  const [colors, setColors] = useState(() => parse(defaultValue));
  function update(index: number, field: "name" | "value", value: string) { setColors((current) => current.map((color, i) => i === index ? { ...color, [field]: value } : color)); }
  return <fieldset className="space-y-3"><legend className="mb-2 text-sm font-medium">Pilihan warna *</legend><input type="hidden" name="colors" value={JSON.stringify(colors)} />{colors.map((color, index) => <div key={index} className="flex items-center gap-3"><Input aria-label={`Warna ${index + 1}`} type="color" value={color.value} onChange={(event) => update(index, "value", event.target.value)} className="size-11 shrink-0 cursor-pointer rounded border border-outline-variant" /><Input aria-label={`Nama warna ${index + 1}`} value={color.name} onChange={(event) => update(index, "name", event.target.value)} required maxLength={80} placeholder="Nama warna, misalnya Ivory" /><Button variant="ghost" size="icon" disabled={colors.length === 1} aria-label={`Hapus warna ${index + 1}`} onClick={() => setColors(colors.filter((_, i) => i !== index))}>×</Button></div>)}<Button variant="outline" size="sm" disabled={colors.length >= 30} onClick={() => setColors([...colors, { name: "", value: "#faf7f2" }])}>+ Tambah Warna</Button></fieldset>;
}
