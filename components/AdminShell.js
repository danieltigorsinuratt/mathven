"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Toast from "./Toast";

// Kerangka semua halaman admin: sidebar + topbar + isi halaman + toast.
// Di layar kecil (HP/tablet), sidebar disembunyikan dan dibuka lewat tombol menu.
export default function AdminShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="admin">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Latar gelap di belakang sidebar saat dibuka di HP; diklik = menutup menu */}
      {menuOpen && <div className="sidebar-backdrop" onClick={() => setMenuOpen(false)} />}

      <div className="main">
        <Topbar onMenuClick={() => setMenuOpen(true)} />
        <main className="content">{children}</main>
      </div>

      <Toast />
    </div>
  );
}