"use client";
import { useRef, useState, type FormEvent } from "react";
import { sections, type AdminRecord } from "@/lib/admin/data";
import { useAdminData } from "@/lib/admin/use-admin-data";
import Button from "@/components/ui/button";
import { DataTable, FormField, Input, PageHeader, StatusBadge } from "./ui";

export default function Manager({ section }: { section: string }) {
  const config = sections[section];
  const { data, save, remove } = useAdminData();
  const [editorVersion, setEditorVersion] = useState(0);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [editing, setEditing] = useState<AdminRecord | null>(null);
  const [notice, setNotice] = useState("");
  const [formError, setFormError] = useState("");
  const [pendingDelete, setPendingDelete] = useState<AdminRecord | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const deleteDialog = useRef<HTMLDialogElement>(null);
  const filtered = data[section].filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) && (status === "all" || item.status === status));
  function open(record?: AdminRecord) { setEditorVersion((value) => value + 1); setEditing(record ?? null); setFormError(""); dialog.current?.showModal(); }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;
    if (!fields.title.trim()) { setFormError("Judul wajib diisi."); return; }
    if (config.fields.some((field) => field.required && !fields[field.key]?.trim())) { setFormError("Lengkapi semua kolom wajib."); return; }
    if (config.fields.some((field) => field.type === "number" && fields[field.key] && (!Number.isFinite(Number(fields[field.key])) || Number(fields[field.key]) < 0))) { setFormError("Nilai angka tidak valid."); return; }
    const record: AdminRecord = { ...fields, id: editing?.id ?? crypto.randomUUID(), title: fields.title.trim(), status: fields.status === "published" ? "published" : "draft", updatedAt: new Date().toISOString() };
    if (save(section, record)) { dialog.current?.close(); setNotice("Perubahan disimpan di browser."); } else setFormError("Penyimpanan gagal. Periksa izin penyimpanan browser.");
  }
  return <>
    <PageHeader title={config.title} description={config.description} action={<Button onClick={() => open()}>+ Tambah Data</Button>} />
    <div className="mb-5 flex flex-wrap items-end gap-4"><div className="min-w-48 flex-1"><FormField label="Cari judul"><Input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Cari ${config.title.toLowerCase()}…`} /></FormField></div><FormField label="Status"><select className="rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-sm" value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">Semua status</option><option value="draft">Draft</option><option value="published">Published</option></select></FormField></div>
    <p role="status" className="mb-4 text-sm text-secondary">{notice}</p><p className="mb-3 text-xs text-on-surface-variant">{filtered.length} dari {data[section].length} data</p>
    <DataTable rows={filtered} empty={query || status !== "all" ? "Tidak ada hasil yang sesuai filter." : "Belum ada data. Tambahkan entri pertama Anda."} columns={[
      { label: "Judul", render: (item) => <button className="text-left font-semibold hover:underline" onClick={() => open(item)}>{item.title}</button> },
      ...(section === "products" ? [{ label: "Harga / stok", render: (item: AdminRecord) => <span className="whitespace-nowrap">Rp {Number(item.price || 0).toLocaleString("id-ID")} · {item.stock || 0} pcs</span> }] : []),
      { label: "Status", render: (item) => <StatusBadge status={item.status} /> },
      { label: "Diperbarui", render: (item) => <span className="whitespace-nowrap text-xs text-on-surface-variant">{new Date(item.updatedAt).toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta" })}</span> },
      { label: "Aksi", render: (item) => <div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => open(item)}>Edit</Button><Button variant="ghost" size="sm" className="text-error" onClick={() => { setPendingDelete(item); deleteDialog.current?.showModal(); }}>Hapus</Button></div> },
    ]} />
    <dialog ref={dialog} className="m-auto max-h-[90dvh] w-[min(640px,calc(100%-2rem))] overflow-y-auto rounded-2xl bg-surface p-6 text-primary backdrop:bg-primary/50" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} aria-labelledby="editor-title">
      <form key={editorVersion} onSubmit={submit}><div className="mb-6 flex items-center justify-between gap-4"><h2 id="editor-title" className="font-display text-2xl">{editing ? "Edit" : "Tambah"} {config.title}</h2><Button variant="ghost" size="icon" aria-label="Tutup form" onClick={() => dialog.current?.close()}>×</Button></div><div className="grid gap-5"><FormField label="Judul / Nama *"><Input name="title" defaultValue={editing?.title ?? ""} required maxLength={200} /></FormField>{config.fields.map((field) => <FormField key={field.key} label={`${field.label}${field.required ? " *" : ""}`}>{field.type === "textarea" ? <textarea name={field.key} defaultValue={editing?.[field.key] ?? ""} required={field.required} rows={5} className="rounded-lg border border-outline-variant bg-surface-container-lowest p-3 text-sm" /> : <Input name={field.key} type={field.type ?? "text"} defaultValue={editing?.[field.key] ?? ""} required={field.required} min={field.key === "rating" ? 1 : 0} max={field.key === "rating" ? 5 : undefined} step={1} />}</FormField>)}<FormField label="Status"><select name="status" defaultValue={editing?.status ?? "draft"} className="rounded-lg border border-outline-variant bg-surface-container-lowest p-3"><option value="draft">Draft</option><option value="published">Published (simulasi)</option></select></FormField></div><p role="alert" className="mt-4 text-sm text-error">{formError}</p><div className="mt-6 flex justify-end gap-3"><Button variant="outline" onClick={() => dialog.current?.close()}>Batal</Button><Button type="submit">Simpan</Button></div></form>
    </dialog>
    <dialog ref={deleteDialog} aria-labelledby="delete-title" className="m-auto w-[min(440px,calc(100%-2rem))] rounded-2xl bg-surface p-6 text-primary backdrop:bg-primary/50"><h2 id="delete-title" className="font-display text-xl">Hapus data?</h2><p className="mt-4 text-sm">“{pendingDelete?.title}” akan dihapus dari data lokal.</p><div className="mt-6 flex justify-end gap-3"><Button variant="outline" onClick={() => deleteDialog.current?.close()}>Batal</Button><Button variant="destructive" onClick={() => { if (pendingDelete) { setNotice(remove(section, pendingDelete.id) ? "Data dihapus." : "Gagal menghapus data."); deleteDialog.current?.close(); } }}>Hapus</Button></div></dialog>
  </>;
}
