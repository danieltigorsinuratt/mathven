"use client";

import { usePathname } from "next/navigation";

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/materi": "Kelola Materi",
  "/soal": "Kelola Soal",
  "/user": "Kelola User",
};

export default function Topbar() {
  const pathname = usePathname();
  const key = Object.keys(TITLES).find((k) => pathname === k || pathname.startsWith(`${k}/`));
  const title = key ? TITLES[key] : "Dashboard";

  return (
    <header className="topbar">
      <h2 className="topbar__title">{title}</h2>
      <div className="topbar__user">
        <span className="topbar__avatar">A</span>
        <span className="topbar__name">Admin</span>
      </div>
    </header>
  );
}
