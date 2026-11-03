# MathVenture Admin Panel (Next.js)

Halaman login dan dashboard admin MathVenture, dibuat dengan Next.js (App Router) + TypeScript.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Akun login

Diatur di file `.env.local`:

| Variabel         | Nilai awal                    |
| ---------------- | ----------------------------- |
| `ADMIN_EMAIL`    | adminmathventure@gmail.com    |
| `ADMIN_PASSWORD` | Admin@123456                  |
| `AUTH_SECRET`    | string acak untuk token sesi  |

Ganti nilainya sebelum dipakai sungguhan, lalu restart `npm run dev`.

## Struktur

- `app/login` – halaman login (state kosong, terisi, error wajib diisi, error salah password)
- `app/(admin)/dashboard` – dashboard dengan sidebar, topbar, dan 3 kartu statistik
- `app/(admin)/materi|soal|user` – halaman kosong sebagai tempat lanjutan
- `app/api/login`, `app/api/logout` – autentikasi sederhana berbasis cookie
- `middleware.ts` – mengarahkan ke `/login` bila belum masuk
- `public/logo.png` – logo MathVenture
