# MathVenture Admin Panel

Dibuat dengan Next.js (App Router), JavaScript, dan CSS biasa.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Peta halaman (routing)

Di Next.js, **alamat halaman = nama folder** di dalam `app/`. Setiap folder harus punya file `page.js`.

| Alamat | File | Dikerjakan oleh | Status |
|---|---|---|---|
| `/login` | `app/login/page.js` | Teman 1 | Belum (placeholder) |
| `/dashboard` | `app/(admin)/dashboard/page.js` | Teman 2 | Belum (placeholder) |
| `/kelola-materi` | `app/(admin)/kelola-materi/page.js` | Teman 3 | Belum (placeholder) |
| `/kelola-materi/tambah` | `app/(admin)/kelola-materi/tambah/page.js` | Teman 3 | Belum (placeholder) |
| `/kelola-soal` | `app/(admin)/kelola-soal/page.js` | Aku | Selesai |
| `/kelola-soal/tambah` | `app/(admin)/kelola-soal/tambah/page.js` | Aku | Selesai |
| `/kelola-soal/[id]/edit` | `app/(admin)/kelola-soal/[id]/edit/page.js` | Aku | Selesai |
| `/kelola-user` | `app/(admin)/kelola-user/page.js` | Aku | Selesai |
| `/kelola-user/tambah` | `app/(admin)/kelola-user/tambah/page.js` | Aku | Selesai |
| `/kelola-user/[id]/edit` | `app/(admin)/kelola-user/[id]/edit/page.js` | Aku | Selesai |

Ganti "Teman 1/2/3" dengan nama kalian.

Catatan:
- Folder `(admin)` pakai tanda kurung, jadi tidak muncul di alamat. Gunanya supaya semua halaman di dalamnya otomatis punya sidebar (dari `app/(admin)/layout.js`).
- Folder `[id]` artinya bagian alamat itu bisa diisi angka apa saja, misalnya `/kelola-soal/3/edit`.

## Struktur folder

```
app/
  layout.js            -> pembungkus semua halaman (font + data)
  page.js              -> "/" langsung diarahkan ke /login
  globals.css          -> semua warna dan gaya (color palette ada di paling atas)
  login/               -> halaman login (tanpa sidebar)
  (admin)/
    layout.js          -> sidebar + topbar
    dashboard/
    kelola-materi/
    kelola-soal/
    kelola-user/
components/            -> potongan tampilan yang dipakai ulang
  Sidebar.js, Topbar.js, PageHeader.js, Field.js, FormAlert.js, Toast.js, Icon.js
  SoalForm.js, UserForm.js   -> contoh formulir lengkap dengan validasi
  Placeholder.js       -> tampilan sementara untuk halaman yang belum dikerjakan
lib/
  initialData.js       -> data contoh (4 materi, 5 soal, 5 siswa)
  DataContext.js       -> tempat data disimpan, dipakai lewat useData()
public/
  logo.png
```

## Untuk teman tim: cara mulai mengerjakan

1. Buka file halamanmu (lihat tabel di atas).
2. Hapus `<Placeholder ... />`, lalu tulis tampilan sesuai PDF hi-fi.
3. Contoh yang bisa ditiru:
   - Halaman daftar (tabel): `app/(admin)/kelola-soal/page.js`
   - Formulir + pesan error kolom kosong: `components/SoalForm.js`
4. Pakai class yang sudah ada di `globals.css`, misalnya `btn btn-primary`, `card`, `table`, `input`, `input error`.
5. Ambil data dengan:

```js
"use client";
import { useData } from "@/lib/DataContext";

const { materi, addMateri, updateMateri, deleteMateri, showFlash } = useData();
```

## Catatan penting

Data masih disimpan sementara di browser. Kalau halaman di-refresh, data kembali ke data contoh. Ini normal untuk tahap sekarang; nanti tinggal disambungkan ke database.
