"use client";

import { useEffect } from "react";
import { useData } from "@/lib/DataContext";
import Icon from "./Icon";

// Notifikasi hijau di kanan bawah, hilang sendiri setelah 3 detik.
// Untuk memunculkannya dari halaman mana pun: showFlash("Soal berhasil disimpan.")
export default function Toast() {
  const { flash, clearFlash } = useData();

  useEffect(() => {
    if (!flash) return;
    const timer = setTimeout(clearFlash, 3000);
    return () => clearTimeout(timer);
  }, [flash]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!flash) return null;

  return (
    <div className="toast" role="status">
      <Icon name="check" size={20} />
      {flash}
    </div>
  );
}
