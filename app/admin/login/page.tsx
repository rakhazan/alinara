"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/button";
import { FormField } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { Loader } from "@/components/ui/loader";
export default function AdminLogin() {
  const [error, setError] = useState(""); const [pending, setPending] = useState(false); const router = useRouter();
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setPending(true); setError(""); const key = new FormData(event.currentTarget).get("key"); try { const response = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key }) }); const body = await response.json(); if (!response.ok) throw new Error(body.error); router.replace("/admin"); router.refresh(); } catch (error) { setError(error instanceof Error ? error.message : "Koneksi gagal."); } finally { setPending(false); } }
  return <main className="grid min-h-dvh place-items-center bg-surface p-6"><form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-outline-variant bg-white p-8 shadow-sm"><p className="text-xs uppercase tracking-widest text-secondary">Alinara Studio</p><h1 className="mt-4 font-display text-3xl">Masuk Admin</h1><p className="my-5 text-sm text-on-surface-variant">Gunakan kunci akses admin untuk mengelola toko.</p><FormField label="Kunci akses"><Input name="key" type="password" autoComplete="current-password" required maxLength={512} /></FormField>{error && <Alert role="alert" variant="destructive" className="mt-4">{error}</Alert>}<Button type="submit" disabled={pending} className="mt-5 w-full">{pending && <Loader size="sm" />} {pending ? "Memeriksa…" : "Masuk"}</Button><Link href="/" className="mt-6 block text-center text-sm text-secondary">Kembali ke toko</Link></form></main>;
}
