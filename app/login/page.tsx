"use client";

import { useState, type ReactNode } from "react";

import {
  LayoutDashboard,
  BookOpen,
  FileQuestion,
  Users,
  LogOut,
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
  const [remember, setRemember] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffaf0] px-5">
      <div className="w-full max-w-[430px] rounded-[24px] bg-white px-8 py-9 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">

        {/* LOGO */}
        <img
          src="/mathventure-logo.png"
          alt="MathVenture"
          className="mx-auto mb-5 h-[80px] w-[80px] object-contain"
        />

        {/* JUDUL */}
        <div className="text-center">
          <h1 className="text-[23px] font-black text-[#3f343b]">
            Masuk EduAdmin
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Silakan masuk ke panel admin MathVenture
          </p>
        </div>

        {/* EMAIL */}
        <div className="mt-6">
          <label className="mb-2 block text-sm font-bold">
            Email Admin
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan Email"
            className="h-11 w-full rounded-xl border border-[#9e8e91] bg-[#f3f6ff] px-4 text-sm outline-none transition focus:border-[#f23873]"
          />
        </div>

        {/* PASSWORD */}
        <div className="mt-5">
          <label className="mb-2 block text-sm font-bold">
            Kata Sandi
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan Kata Sandi"
            className="h-11 w-full rounded-xl border border-[#9e8e91] bg-[#f3f6ff] px-4 text-sm outline-none transition focus:border-[#f23873]"
          />
        </div>

        {/* INGAT SAYA */}
        <div className="mt-4 flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 accent-[#f23873]"
          />

          <label
            htmlFor="remember"
            className="text-sm text-gray-500"
          >
            Ingat saya
          </label>
        </div>

        {/* TOMBOL LOGIN */}
        <button
          onClick={onLogin}
          className="mt-6 h-12 w-full rounded-lg bg-[#f23873] text-sm font-black text-white shadow-[0_4px_0_#cf285d] transition hover:bg-[#e9326c] active:translate-y-[2px] active:shadow-none"
        >
          MASUK KE DASHBOARD
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

        {/* LOGO */}
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

function Dashboard({
  setPage,
}: {
  setPage: (page: Page) => void;
}) {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pb-16 pt-12">

      {/* JUDUL DASHBOARD */}
      <div className="mb-8 inline-block rounded-xl bg-[#fff1c7] px-5 py-2">
        <h1 className="text-[28px] font-black">
          Dashboard
        </h1>
      </div>

      {/* KARTU STATISTIK */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* TOTAL SISWA */}
        <div className="min-h-[150px] rounded-2xl bg-[#e5d8ff] p-6 shadow-sm">

          <img
            src="/siswa.png"
            alt="Siswa"
            className="h-[58px] w-[58px] object-contain"
          />

          <p className="mt-3 text-sm font-bold">
            Total Siswa
          </p>

          <p className="mt-1 text-3xl font-black">
            0
          </p>

        </div>

        {/* TOTAL MATERI */}
        <div className="min-h-[150px] rounded-2xl bg-[#f9d7e3] p-6 shadow-sm">

          <img
            src="/materi.png"
            alt="Materi"
            className="h-[58px] w-[58px] object-contain"
          />

          <p className="mt-3 text-sm font-bold">
            Total Materi
          </p>

          <p className="mt-1 text-3xl font-black">
            0
          </p>

        </div>

        {/* TOTAL SOAL */}
        <div className="flex justify-center md:col-span-2">

          <div className="w-full max-w-[430px] rounded-2xl bg-[#d8f0ff] p-6 shadow-sm">

            <img
              src="/soal.png"
              alt="Soal"
              className="h-[58px] w-[58px] object-contain"
            />

            <p className="mt-3 text-sm font-bold">
              Total Soal
            </p>

            <p className="mt-1 text-3xl font-black">
              0
            </p>

          </div>

        </div>

      </div>

      {/* KELOLA MATHVENTURE */}
      <div className="mt-12">

        <h2 className="mb-5 text-xl font-black">
          Kelola MathVenture
        </h2>

        <div className="grid gap-5 md:grid-cols-3">

          {/* KELOLA MATERI */}
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

          {/* KELOLA SOAL */}
          <button
            className="rounded-2xl border border-[#eadfe2] bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
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

          {/* KELOLA USER */}
          <button
            className="rounded-2xl border border-[#eadfe2] bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
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
// TAMBAH MATERI
// ======================================================

function TambahMateri() {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  return (
    <section className="mx-auto max-w-[1100px] px-6 pb-16 pt-10">

      {/* JUDUL */}
      <div className="mb-8 inline-block rounded-xl bg-[#fff1c7] px-5 py-2">
        <h1 className="text-[27px] font-black">
          Tambah Materi
        </h1>
      </div>

      {/* FORM */}
      <div className="rounded-2xl bg-[#e4d8fa] p-6 md:p-7">

        {/* JUDUL MATERI */}
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