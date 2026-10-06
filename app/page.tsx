"use client";

import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  BookOpen,
  FileQuestion,
  Users,
  LogOut,
  GraduationCap,
  ClipboardList,
  Plus,
} from "lucide-react";

type Page = "dashboard" | "materi";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <main className="min-h-screen bg-[#fffdf7] text-[#40373d]">
      <Navbar
        page={page}
        setPage={setPage}
        onLogout={() => {
          setIsLoggedIn(false);
          setPage("dashboard");
        }}
      />

      {page === "dashboard" && <Dashboard setPage={setPage} />}

      {page === "materi" && <TambahMateri />}
    </main>
  );
}

// ======================================================
// LOGIN
// ======================================================

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffdf7] px-5">
      <div className="w-full max-w-[430px] rounded-[24px] bg-[#f9dce7] px-8 py-9 shadow-[0_8px_20px_rgba(180,130,150,0.15)]">

        {/* LOGO ASLI */}
        <img
          src="/mathventure-logo.png"
          alt="MathVenture"
          className="mx-auto mb-5 h-[85px] w-[85px] object-contain"
        />

        <h1 className="text-center text-[23px] font-black text-[#3f343b]">
          Masuk ke Admin Panel
        </h1>

        {/* EMAIL */}
        <div className="mt-6">
          <label className="mb-2 block text-sm font-bold">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan Email"
            className="h-11 w-full rounded-md border border-[#9e8e91] bg-[#fff6cf] px-4 text-sm outline-none transition focus:border-[#f23873]"
          />
        </div>

        {/* PASSWORD */}
        <div className="mt-5">
          <label className="mb-2 block text-sm font-bold">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan Password"
            className="h-11 w-full rounded-md border border-[#9e8e91] bg-[#fff6cf] px-4 text-sm outline-none transition focus:border-[#f23873]"
          />
        </div>

        {/* MASUK */}
        <button
          onClick={onLogin}
          className="mt-7 h-12 w-full rounded-lg bg-[#f23873] text-sm font-black text-white shadow-[0_4px_0_#cf285d] transition hover:bg-[#e9326c] active:translate-y-[2px] active:shadow-none"
        >
          MASUK
        </button>
      </div>
    </main>
  );
}

// ======================================================
// NAVBAR
// ======================================================

function Navbar({
  page,
  setPage,
  onLogout,
}: {
  page: Page;
  setPage: (page: Page) => void;
  onLogout: () => void;
}) {
  return (
    <nav className="px-5 pt-5">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between rounded-xl bg-white px-4 py-2 shadow-[0_2px_5px_rgba(0,0,0,0.18)]">

        {/* LOGO ASLI */}
        <button
          onClick={() => setPage("dashboard")}
          className="flex h-11 w-11 items-center justify-center"
        >
          <img
            src="/mathventure-logo.png"
            alt="MathVenture"
            className="h-11 w-11 object-contain"
          />
        </button>

        {/* MENU */}
        <div className="hidden items-center gap-1 md:flex">
          <NavButton
            icon={<LayoutDashboard size={17} />}
            text="Dashboard"
            active={page === "dashboard"}
            onClick={() => setPage("dashboard")}
          />

          <NavButton
            icon={<BookOpen size={17} />}
            text="Kelola Materi"
            active={page === "materi"}
            onClick={() => setPage("materi")}
          />

          <NavButton
            icon={<FileQuestion size={17} />}
            text="Kelola Soal"
            onClick={() => {}}
          />

          <NavButton
            icon={<Users size={17} />}
            text="Kelola User"
            onClick={() => {}}
          />
        </div>

        {/* KELUAR */}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#51474c] transition hover:text-[#f23873]"
        >
          <LogOut size={17} />
          Keluar
        </button>
      </div>
    </nav>
  );
}

// ======================================================
// NAV BUTTON
// ======================================================

function NavButton({
  icon,
  text,
  active = false,
  onClick,
}: {
  icon: ReactNode;
  text: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition ${
        active
          ? "text-[#f23873] underline decoration-2 underline-offset-4"
          : "text-[#51474c] hover:text-[#f23873]"
      }`}
    >
      {icon}
      {text}
    </button>
  );
}

// ======================================================
// DASHBOARD
// ======================================================

function Dashboard({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pb-16 pt-12">

      <div className="mb-8 inline-block rounded-xl bg-[#fff1c7] px-5 py-2">
        <h1 className="text-[28px] font-black">
          Dashboard
        </h1>
      </div>

      {/* STAT */}
      <div className="grid gap-6 md:grid-cols-2">

        <StatCard
          title="Total Siswa"
          value="0"
          icon={<GraduationCap size={32} />}
          className="bg-[#e5d8ff]"
          iconClass="bg-[#bda6f0]"
        />

        <StatCard
          title="Total Materi"
          value="0"
          icon={<BookOpen size={32} />}
          className="bg-[#f9d7e3]"
          iconClass="bg-[#f5a4bc]"
        />

        <div className="flex justify-center md:col-span-2">
          <StatCard
            title="Total Soal"
            value="0"
            icon={<ClipboardList size={32} />}
            className="w-full max-w-[430px] bg-[#d8f0ff]"
            iconClass="bg-[#72c4a7]"
          />
        </div>
      </div>

      {/* QUICK ACCESS */}
      <div className="mt-12">
        <h2 className="mb-5 text-xl font-black">
          Kelola MathVenture
        </h2>

        <div className="grid gap-5 md:grid-cols-3">

          <button
            onClick={() => setPage("materi")}
            className="rounded-2xl border border-[#eadfe2] bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f9dce7] text-[#f23873]">
              <Plus size={25} />
            </div>

            <h3 className="font-black">
              Kelola Materi
            </h3>

            <p className="mt-1 text-sm text-[#81777e]">
              Tambah dan kelola materi matematika.
            </p>
          </button>

          <button className="rounded-2xl border border-[#eadfe2] bg-white p-5 text-left shadow-sm">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eee7ff]">
              📝
            </div>

            <h3 className="font-black">
              Kelola Soal
            </h3>

            <p className="mt-1 text-sm text-[#81777e]">
              Buat dan kelola soal latihan siswa.
            </p>
          </button>

          <button className="rounded-2xl border border-[#eadfe2] bg-white p-5 text-left shadow-sm">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#dff4ff]">
              👩🏻‍🎓
            </div>

            <h3 className="font-black">
              Kelola User
            </h3>

            <p className="mt-1 text-sm text-[#81777e]">
              Lihat dan kelola data siswa.
            </p>
          </button>

        </div>
      </div>
    </section>
  );
}

// ======================================================
// STAT CARD
// ======================================================

function StatCard({
  title,
  value,
  icon,
  className,
  iconClass,
}: {
  title: string;
  value: string;
  icon: ReactNode;
  className: string;
  iconClass: string;
}) {
  return (
    <div
      className={`${className} relative min-h-[140px] rounded-2xl p-6 shadow-sm`}
    >
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-bold">
            {title}
          </p>

          <p className="mt-2 text-3xl font-black">
            {value}
          </p>
        </div>

        <div
          className={`${iconClass} flex h-12 w-12 items-center justify-center rounded-full text-white`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

// ======================================================
// TAMBAH MATERI
// ======================================================

function TambahMateri() {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  return (
    <section className="mx-auto max-w-[1100px] px-6 pb-16 pt-10">

      <div className="mb-8 inline-block rounded-xl bg-[#fff1c7] px-5 py-2">
        <h1 className="text-[27px] font-black">
          Tambah Materi
        </h1>
      </div>

      <div className="rounded-2xl bg-[#e4d8fa] p-6 md:p-7">

        {/* JUDUL */}
        <div>
          <label className="mb-3 block text-sm font-black">
            Judul Materi
          </label>

          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            placeholder="Masukkan Judul Materi"
            className="h-11 w-full rounded-lg border border-[#9c9298] bg-[#fffdf7] px-4 text-sm outline-none focus:border-[#f23873]"
          />
        </div>

        {/* DESKRIPSI */}
        <div className="mt-5">
          <label className="mb-3 block text-sm font-black">
            Deskripsi
          </label>

          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Isi Detail Materi"
            rows={5}
            className="w-full resize-none rounded-lg border border-[#9c9298] bg-[#fffdf7] px-4 py-3 text-sm outline-none focus:border-[#f23873]"
          />
        </div>

        {/* SIMPAN */}
        <button
          onClick={() => {
            alert("Materi berhasil disimpan!");
            setJudul("");
            setDeskripsi("");
          }}
          className="mt-4 h-12 w-full rounded-lg bg-[#666666] text-sm font-black text-white shadow-[0_3px_0_#444] transition hover:bg-[#555] active:translate-y-[2px] active:shadow-none"
        >
          SIMPAN
        </button>

      </div>
    </section>
  );
}