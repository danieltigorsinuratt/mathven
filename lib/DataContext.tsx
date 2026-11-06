"use client";

// Penyimpanan data materi, soal, dan user untuk semua halaman admin.
// Dipakai di halaman mana pun lewat:  const { materi, soal, users } = useData();
//
// Catatan: data masih disimpan sementara di state React,
// jadi kembali ke data awal kalau halaman di-refresh (tanpa database).

import { createContext, useContext, useState, type ReactNode } from "react";

export type Materi = { id: number; judul: string; deskripsi: string };
export type Soal = { id: number; materiId: number; pertanyaan: string; jawaban: string };
export type User = { id: number; nama: string; kelas: string; sekolah: string };

const initialMateri: Materi[] = [
  { id: 1, judul: "Mengenal Bilangan", deskripsi: "Bilangan dapat diurutkan dari yang terkecil hingga terbesar dengan membandingkan nilai tempatnya. Bilangan dengan ratusan yang lebih kecil diletakkan lebih dahulu. Jadi, urutan bilangan dari yang terkecil adalah 125, 238, 341, kemudian 456." },
  { id: 2, judul: "Nilai Tempat", deskripsi: "Mengenal satuan, puluhan, dan ratusan" },
  { id: 3, judul: "Penjumlahan", deskripsi: "Penjumlahan bersusun hingga ratusan" },
  { id: 4, judul: "Pengurangan", deskripsi: "Pengurangan bersusun dengan meminjam" },
];

const initialSoal: Soal[] = [
  { id: 1, materiId: 1, pertanyaan: "456", jawaban: "Empat Ratus Lima Puluh Enam" },
  { id: 2, materiId: 1, pertanyaan: "809", jawaban: "Delapan Ratus Sembilan" },
  { id: 3, materiId: 2, pertanyaan: "Angka 7 pada 372 bernilai ...", jawaban: "Puluhan" },
  { id: 4, materiId: 3, pertanyaan: "235 + 148 = ...", jawaban: "383" },
  { id: 5, materiId: 4, pertanyaan: "502 - 267 = ...", jawaban: "235" },
];

const initialUsers: User[] = [
  { id: 1, nama: "Eca", kelas: "3 SD", sekolah: "SD Brawijaya" },
  { id: 2, nama: "Rafi Akbar", kelas: "3 SD", sekolah: "SD Brawijaya" },
  { id: 3, nama: "Naura Azzahra", kelas: "2 SD", sekolah: "SDN Sumbersari 1" },
  { id: 4, nama: "Daffa Pratama", kelas: "4 SD", sekolah: "SD Islam Malang" },
  { id: 5, nama: "Kirana Larasati", kelas: "3 SD", sekolah: "SDN Lowokwaru 3" },
];

type DataContextValue = {
  materi: Materi[];
  addMateri: (data: Omit<Materi, "id">) => void;
  updateMateri: (id: number, data: Omit<Materi, "id">) => void;
  deleteMateri: (id: number) => void;
  soal: Soal[];
  addSoal: (data: Omit<Soal, "id">) => void;
  updateSoal: (id: number, data: Omit<Soal, "id">) => void;
  deleteSoal: (id: number) => void;
  users: User[];
  addUser: (data: Omit<User, "id">) => void;
  updateUser: (id: number, data: Omit<User, "id">) => void;
  deleteUser: (id: number) => void;
  flash: string;
  showFlash: (message: string) => void;
  clearFlash: () => void;
};

const DataContext = createContext<DataContextValue | null>(null);

function nextId(list: { id: number }[]) {
  return list.length === 0 ? 1 : Math.max(...list.map((item) => item.id)) + 1;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [materi, setMateri] = useState(initialMateri);
  const [soal, setSoal] = useState(initialSoal);
  const [users, setUsers] = useState(initialUsers);
  const [flash, setFlash] = useState("");

  const value: DataContextValue = {
    materi,
    addMateri: (data) => setMateri((l) => [{ id: nextId(l), ...data }, ...l]),
    updateMateri: (id, data) => setMateri((l) => l.map((i) => (i.id === id ? { ...i, ...data } : i))),
    deleteMateri: (id) => setMateri((l) => l.filter((i) => i.id !== id)),
    soal,
    addSoal: (data) => setSoal((l) => [{ id: nextId(l), ...data }, ...l]),
    updateSoal: (id, data) => setSoal((l) => l.map((i) => (i.id === id ? { ...i, ...data } : i))),
    deleteSoal: (id) => setSoal((l) => l.filter((i) => i.id !== id)),
    users,
    addUser: (data) => setUsers((l) => [{ id: nextId(l), ...data }, ...l]),
    updateUser: (id, data) => setUsers((l) => l.map((i) => (i.id === id ? { ...i, ...data } : i))),
    deleteUser: (id) => setUsers((l) => l.filter((i) => i.id !== id)),
    flash,
    showFlash: setFlash,
    clearFlash: () => setFlash(""),
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData() harus dipakai di dalam <DataProvider>.");
  return context;
}
