"use client";
import Button from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) { return <div className="px-6 py-20 text-center"><h1 className="font-display text-3xl">Kami belum dapat memuat halaman</h1><p className="my-5 text-sm text-on-surface-variant">Silakan coba kembali sebentar lagi.</p><Button onClick={reset}>Coba Lagi</Button></div>; }
