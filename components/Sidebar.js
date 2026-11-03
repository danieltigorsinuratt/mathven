"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

// Daftar menu. Kalau mau menambah menu baru, cukup tambahkan di sini.
const menu = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/kelola-materi", label: "Kelola Materi", icon: "book" },
  { href: "/kelola-soal", label: "Kelola Soal", icon: "clipboard" },
  { href: "/kelola-user", label: "Kelola User", icon: "users" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="/logo.png" alt="Logo MathVenture" />
        <div>
          <b>MathVenture</b>
          <span>Admin Panel</span>
        </div>
      </div>

      <nav>
        {menu.map((item) => {
          // Menu aktif juga saat berada di sub-halaman, misalnya /kelola-soal/tambah
          const active = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={`nav-link ${active ? "active" : ""}`}>
              <Icon name={item.icon} size={19} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <Link href="/login" className="nav-link">
          <Icon name="logout" size={19} />
          Keluar
        </Link>
      </div>
    </aside>
  );
}
