"use client";

import { usePathname } from "next/navigation";

// Menentukan judul di topbar berdasarkan alamat halaman.
function getTitle(pathname) {
  const sections = [
    { base: "/dashboard", name: "Dashboard" },
    { base: "/kelola-materi", name: "Materi" },
    { base: "/kelola-soal", name: "Soal" },
    { base: "/kelola-user", name: "User" },
  ];
  const section = sections.find((s) => pathname.startsWith(s.base));
  if (!section) return "";
  if (section.base === "/dashboard") return "Dashboard";
  if (pathname.endsWith("/tambah")) return `Tambah ${section.name}`;
  if (pathname.endsWith("/edit")) return `Edit ${section.name}`;
  return `Kelola ${section.name}`;
}

export default function Topbar() {
  const pathname = usePathname();

  return (
    <header className="topbar">
      <span>{getTitle(pathname)}</span>
      <div className="topbar-user">
        <div className="avatar">A</div>
        Admin
      </div>
    </header>
  );
}
