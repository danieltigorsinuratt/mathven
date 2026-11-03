"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Brand from "./Brand";
import { DashboardIcon, LogoutIcon, MateriIcon, SoalIcon, UserIcon } from "./icons";

const NAV = [
  { href: "/dashboard", label: "Dashboard", Icon: DashboardIcon },
  { href: "/materi", label: "Kelola Materi", Icon: MateriIcon },
  { href: "/soal", label: "Kelola Soal", Icon: SoalIcon },
  { href: "/user", label: "Kelola User", Icon: UserIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/logout", { method: "POST" });
    } finally {
      router.replace("/login");
      router.refresh();
    }
  }

  return (
    <aside className="sidebar">
      <Brand />

      <nav className="nav">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={`nav__item${active ? " nav__item--active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <span className="nav__icon">
                <Icon />
              </span>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <button type="button" className="logout" onClick={handleLogout}>
        <LogoutIcon />
        <span>Keluar</span>
      </button>
    </aside>
  );
}
