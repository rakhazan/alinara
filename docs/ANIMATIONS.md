# Animasi UI

Motion dikonfigurasi di `components/providers/ui-provider.tsx` dengan `reducedMotion="user"`.

Komponen reusable di `components/ui/motion.tsx`:

- `MotionSurface`: hover lift untuk kartu interaktif. Tidak menggunakan hover CSS agar sentuhan mobile tidak meninggalkan state hover.
- `MotionEntrance`: transisi konten saat mount; gunakan `key` ketika gambar atau view berubah. HTML server tetap terlihat.
- `MotionFeedback`: pulse singkat untuk favorit atau jumlah keranjang; gunakan `key` sesuai nilainya.

Semua komponen memeriksa `useReducedMotion` untuk meniadakan animasi dekoratif ketika pengguna memilih reduced motion. Preferensi juga dihormati oleh animasi section dan perpindahan hero melalui tombol pagination.

`Reveal` menjalankan fade sekali ketika section di bawah viewport masuk layar. Section tidak disembunyikan sebelum JavaScript aktif. Hindari transform pada section penuh karena dapat mengubah perilaku elemen sticky di dalamnya.

Animasi dialog, popup, accordion, dan sidebar tetap memakai transisi CSS yang sudah tersedia. Jangan menambahkan Motion pada properti transform/opacity yang sama saat animasi CSS masih aktif.

## Masuk dan keluar

- `MotionPresence show={visible}` untuk pesan status atau konten kondisional. Wrapper harus tetap mounted; ubah `show` agar animasi keluar sempat berjalan.
- `MotionSwap activeKey={value}` untuk pergantian galeri atau empty state. View lama keluar terlebih dahulu, kemudian view baru masuk. Jangan gunakan key yang berubah setiap render.
- `MotionListItem` di dalam `AnimatePresence initial={false}` untuk daftar dinamis. Berikan key stabil berdasarkan ID, dan letakkan padding pada elemen anak supaya tinggi bisa menyusut sampai nol.

```tsx
<MotionPresence show={!!error}>
  <Alert role="alert" variant="destructive">{error}</Alert>
</MotionPresence>

<MotionSwap activeKey={imageIndex} className="absolute inset-0">
  <Image src={images[imageIndex]} alt="Detail produk" fill />
</MotionSwap>
```

Konten yang sedang keluar diberi `inert` dan `aria-hidden`. Jika aksi menghapus elemen yang sedang fokus, pemanggil harus memindahkan fokus ke elemen yang tetap ada. Halaman keranjang memindahkannya ke judul halaman setelah penghapusan berhasil. Komponen ini tidak menggantikan pengelolaan fokus milik dialog/popover Radix.

## Animasi scroll

Pada halaman publik, tambahkan atribut berikut pada elemen yang ingin dianimasikan:

```tsx
<li data-scroll-reveal="rise" data-scroll-delay={index * 0.04}>
  {/* kartu kategori atau komunitas */}
</li>
```

- `rise`: fade dan pergeseran vertikal 20px.
- `fade`: opacity saja; cocok untuk gambar jurnal yang sudah memiliki transform CSS.
- `data-scroll-delay`: jeda dalam detik, dibatasi maksimal 0.18 detik.

Animasi berjalan satu kali ketika elemen masuk viewport, termasuk kartu di daftar horizontal. Section dengan target individual tidak diberi fade tambahan. Jangan menandai parent dan anak sekaligus, track Embla, atau ancestor elemen sticky dengan `rise`. Target didaftarkan ketika halaman publik mounted; konten dinamis yang baru ditambahkan dapat memakai `MotionEntrance`.

Konten tidak disembunyikan sebelum masuk viewport. Setelah selesai atau ketika preferensi reduced motion berubah, style animasi dibersihkan. Fokus keyboard membatalkan animasi yang sedang berjalan pada elemen tersebut.

Tes interaksi tersedia di `e2e/motion.spec.ts`, mencakup scroll, pergantian galeri cepat, penghapusan item, dan fokus saat keranjang kosong.
