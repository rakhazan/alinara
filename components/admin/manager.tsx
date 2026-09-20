"use client";

import { useRef, useState, type FormEvent } from "react";
import { sections, type AdminRecord } from "@/lib/admin/data";
import { useAdminData } from "@/lib/admin/use-admin-data";
import ColorField from "./color-field";
import Button from "@/components/ui/button";
import { DataTable, FormField, Input, PageHeader, StatusBadge } from "./ui";
import { Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { Alert } from "@/components/ui/alert";
import { Loader } from "@/components/ui/loader";
import { toast } from "@/components/ui/toast";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from "@/components/ui/dropdown";

export default function Manager({ section }: { section: string }) {
  const config = sections[section];
  const { data, save, remove } = useAdminData();
  const [editorVersion, setEditorVersion] = useState(0);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [editing, setEditing] = useState<AdminRecord | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [pendingDelete, setPendingDelete] = useState<AdminRecord | null>(null);
  const [deleting, setDeleting] = useState(false);
  const lock = useRef(false);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const addButton = useRef<HTMLButtonElement>(null);
  const filtered = data[section].filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) && (status === "all" || item.status === status));
  function edit(record?: AdminRecord) { if (!lastTrigger.current?.isConnected) lastTrigger.current = document.activeElement as HTMLElement; setEditorVersion((value) => value + 1); setEditing(record ?? null); setFormError(""); setOpen(true); }
  function restoreFocus(event: Event) { event.preventDefault(); (lastTrigger.current?.isConnected ? lastTrigger.current : addButton.current)?.focus(); }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (lock.current) return;
    const fields = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;
    if (!fields.title.trim() || config.fields.some((field) => field.required && !fields[field.key]?.trim())) { setFormError("Lengkapi semua kolom wajib."); return; }
    if (config.fields.some((field) => field.type === "number" && fields[field.key] && (!Number.isFinite(Number(fields[field.key])) || Number(fields[field.key]) < 0))) { setFormError("Nilai angka tidak valid."); return; }
    const record: AdminRecord = { ...fields, id: editing?.id ?? crypto.randomUUID(), title: fields.title.trim(), status: fields.status === "published" ? "published" : "draft", updatedAt: new Date().toISOString() };
    lock.current = true; setSaving(true);
    try { if (!await save(section, record)) throw new Error(); setOpen(false); toast.success("Perubahan berhasil disimpan."); }
    catch { setFormError("Penyimpanan gagal. Periksa data dan koneksi, lalu coba lagi."); }
    finally { lock.current = false; setSaving(false); }
  }
  async function confirmDelete() {
    if (!pendingDelete || lock.current) return; lock.current = true; setDeleting(true);
    try { if (!await remove(section, pendingDelete.id)) throw new Error(); setPendingDelete(null); toast.success("Data dihapus atau produk diarsipkan."); }
    catch { toast.error("Gagal menghapus data. Coba lagi."); }
    finally { lock.current = false; setDeleting(false); }
  }
  return <>
    <PageHeader title={config.title} description={config.description} action={<Button ref={addButton} onClick={(event) => { lastTrigger.current = event.currentTarget; edit(); }}>+ Tambah Data</Button>} />
    <div className="mb-5 flex flex-wrap items-end gap-4"><div className="min-w-48 flex-1"><FormField label="Cari judul"><InputGroup><InputGroupAddon aria-hidden="true">⌕</InputGroupAddon><Input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Cari ${config.title.toLowerCase()}…`} /></InputGroup></FormField></div><FormField label="Status"><Select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">Semua status</option><option value="draft">Draft</option><option value="published">Published</option></Select></FormField></div>
    <p className="mb-3 text-xs text-on-surface-variant" aria-live="polite">{filtered.length} dari {data[section].length} data</p>
    <DataTable rows={filtered} empty={query || status !== "all" ? "Tidak ada hasil yang sesuai filter." : "Belum ada data. Tambahkan entri pertama Anda."} columns={[
      { label: "Judul", render: (item) => <button className="text-left font-semibold hover:underline" onClick={(event) => { lastTrigger.current = event.currentTarget; edit(item); }}>{item.title}</button> },
      ...(section === "products" ? [{ label: "Harga / stok", render: (item: AdminRecord) => <span className="whitespace-nowrap">Rp {Number(item.price || 0).toLocaleString("id-ID")} · {item.stock || 0} pcs</span> }] : []),
      { label: "Status", render: (item) => <StatusBadge status={item.status} /> },
      { label: "Diperbarui", render: (item) => <span className="whitespace-nowrap text-xs text-on-surface-variant">{new Date(item.updatedAt).toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta" })}</span> },
      { label: "Aksi", render: (item) => <Dropdown><DropdownTrigger asChild><Button variant="ghost" size="icon" aria-label={`Aksi ${item.title}`} onPointerDown={(event) => { lastTrigger.current = event.currentTarget; }} onKeyDown={(event) => { lastTrigger.current = event.currentTarget; }}>⋯</Button></DropdownTrigger><DropdownContent align="end" onCloseAutoFocus={(event) => { if (open || pendingDelete) event.preventDefault(); }}><DropdownItem onSelect={() => edit(item)}>Edit</DropdownItem><DropdownSeparator /><DropdownItem destructive onSelect={() => setPendingDelete(item)}>Hapus / Arsipkan</DropdownItem></DropdownContent></Dropdown> },
    ]} />
    <Dialog open={open} onOpenChange={(value) => { if (!saving) setOpen(value); }}>
      <DialogContent onCloseAutoFocus={restoreFocus}>
        <form key={editorVersion} onSubmit={submit}>
          <DialogHeader><DialogTitle>{editing ? "Edit" : "Tambah"} {config.title}</DialogTitle><DialogDescription>Lengkapi informasi berikut. Kolom bertanda * wajib diisi.</DialogDescription></DialogHeader>
          <fieldset disabled={saving} className="grid gap-5"><FormField label="Judul / Nama *"><Input name="title" defaultValue={editing?.title ?? ""} required maxLength={200} /></FormField>{config.fields.map((field) => field.key === "colors" ? <ColorField key={field.key} defaultValue={editing?.colors ?? ""} /> : <FormField key={field.key} label={`${field.label}${field.required ? " *" : ""}`}>{field.type === "textarea" ? <Textarea name={field.key} defaultValue={editing?.[field.key] ?? ""} required={field.required} rows={5} /> : <Input name={field.key} type={field.type ?? "text"} defaultValue={editing?.[field.key] ?? ""} required={field.required} min={field.key === "rating" ? 1 : 0} max={field.key === "rating" ? 5 : undefined} step={1} />}</FormField>)}<FormField label="Status"><Select name="status" defaultValue={editing?.status ?? "draft"}><option value="draft">Draft</option><option value="published">Published</option></Select></FormField></fieldset>
          {formError && <Alert role="alert" variant="destructive" className="mt-4">{formError}</Alert>}
          <DialogFooter><Button variant="outline" disabled={saving} onClick={() => setOpen(false)}>Batal</Button><Button type="submit" disabled={saving}>{saving && <Loader size="sm" label="Menyimpan" />}Simpan</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    <AlertDialog open={!!pendingDelete} onOpenChange={(value) => { if (!value && !deleting) setPendingDelete(null); }}>
      <AlertDialogContent onCloseAutoFocus={restoreFocus}><AlertDialogTitle>Hapus data?</AlertDialogTitle><AlertDialogDescription>“{pendingDelete?.title}” akan dihapus. Produk yang tersimpan di database akan diarsipkan sebagai draft.</AlertDialogDescription><DialogFooter><AlertDialogCancel disabled={deleting}>Batal</AlertDialogCancel><AlertDialogAction disabled={deleting} onClick={(event) => { event.preventDefault(); void confirmDelete(); }}>{deleting && <Loader size="sm" />}Hapus</AlertDialogAction></DialogFooter></AlertDialogContent>
    </AlertDialog>
  </>;
}
