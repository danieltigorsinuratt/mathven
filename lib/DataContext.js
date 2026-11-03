"use client";

// Tempat menyimpan data materi, soal, dan user yang dipakai semua halaman.
// Cara pakai di halaman mana pun:
//   const { soal, materi, users, addSoal } = useData();
//
// Catatan: data ini masih disimpan sementara di browser (state React),
// jadi akan kembali ke data awal kalau halaman di-refresh.

import { createContext, useContext, useState } from "react";
import { initialMateri, initialSoal, initialUsers } from "./initialData";

const DataContext = createContext(null);

function nextId(list) {
  return list.length === 0 ? 1 : Math.max(...list.map((item) => item.id)) + 1;
}

export function DataProvider({ children }) {
  const [materi, setMateri] = useState(initialMateri);
  const [soal, setSoal] = useState(initialSoal);
  const [users, setUsers] = useState(initialUsers);

  // Pesan notifikasi hijau ("... berhasil disimpan.")
  const [flash, setFlash] = useState("");

  // ---------- Materi (dipakai tim Kelola Materi) ----------
  function addMateri(data) {
    setMateri((list) => [{ id: nextId(list), ...data }, ...list]);
  }
  function updateMateri(id, data) {
    setMateri((list) => list.map((item) => (item.id === id ? { ...item, ...data } : item)));
  }
  function deleteMateri(id) {
    setMateri((list) => list.filter((item) => item.id !== id));
  }

  // ---------- Soal ----------
  function addSoal(data) {
    setSoal((list) => [{ id: nextId(list), ...data }, ...list]);
  }
  function updateSoal(id, data) {
    setSoal((list) => list.map((item) => (item.id === id ? { ...item, ...data } : item)));
  }
  function deleteSoal(id) {
    setSoal((list) => list.filter((item) => item.id !== id));
  }

  // ---------- User ----------
  function addUser(data) {
    setUsers((list) => [{ id: nextId(list), ...data }, ...list]);
  }
  function updateUser(id, data) {
    setUsers((list) => list.map((item) => (item.id === id ? { ...item, ...data } : item)));
  }
  function deleteUser(id) {
    setUsers((list) => list.filter((item) => item.id !== id));
  }

  const value = {
    materi, addMateri, updateMateri, deleteMateri,
    soal, addSoal, updateSoal, deleteSoal,
    users, addUser, updateUser, deleteUser,
    flash, showFlash: setFlash, clearFlash: () => setFlash(""),
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData() harus dipakai di dalam <DataProvider>.");
  }
  return context;
}
