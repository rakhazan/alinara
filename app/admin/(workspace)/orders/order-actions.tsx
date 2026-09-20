"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { toast } from "@/components/ui/toast";
import { Loader } from "@/components/ui/loader";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { DialogFooter } from "@/components/ui/dialog";
export default function OrderActions({ id, status }: { id: string; status: string }) {
  const [pending, setPending] = useState(false); const [error, setError] = useState(""); const [confirmOpen, setConfirmOpen] = useState(false); const lock = useRef(false); const router = useRouter();
  async function update(next: string) {
    if (lock.current) return; lock.current = true; setPending(true); setError("");
    try { const result = await fetch(`/api/admin/orders/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: next }) }); if (!result.ok) throw new Error("Perubahan gagal. Muat ulang dan coba lagi."); setConfirmOpen(false); toast.success("Status pesanan diperbarui."); router.refresh(); }
    catch (error) { setError((error as Error).message); toast.error("Status pesanan gagal diperbarui."); }
    finally { lock.current = false; setPending(false); }
  }
  return <div className="mt-5"><div className="flex gap-3">{status === "pending" && <Button disabled={pending} size="sm" onClick={() => update("confirmed")}>Konfirmasi</Button>}{status === "confirmed" && <Button disabled={pending} size="sm" onClick={() => update("shipped")}>Tandai dikirim</Button>}{["pending", "confirmed"].includes(status) && <AlertDialog open={confirmOpen} onOpenChange={(value) => { if (!pending) setConfirmOpen(value); }}><AlertDialogTrigger asChild><Button variant="outline" disabled={pending} size="sm">Batalkan</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogTitle>Batalkan pesanan?</AlertDialogTitle><AlertDialogDescription>Pesanan akan dibatalkan dan stok produk dikembalikan. Tindakan ini tidak dapat dibatalkan.</AlertDialogDescription><DialogFooter><AlertDialogCancel disabled={pending}>Kembali</AlertDialogCancel><AlertDialogAction disabled={pending} onClick={(event) => { event.preventDefault(); void update("cancelled"); }}>{pending && <Loader size="sm" />}Batalkan Pesanan</AlertDialogAction></DialogFooter></AlertDialogContent></AlertDialog>}</div>{error && <Alert role="alert" variant="destructive" className="mt-3">{error}</Alert>}</div>;
}
