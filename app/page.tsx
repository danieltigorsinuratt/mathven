"use client";

import { useState } from "react";

type Page = "dashboard" | "materi" | "soal" | "user";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState<Page>("dashboard");

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={() => {
          setIsLoggedIn(true);
          setActivePage("dashboard");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fffdf7] text-[#3d343b]">

      {/* NAVBAR */}
      <nav className="mx-auto mt-5 w-[calc(100%-48px)] max-w-[1180px] h-[58px] bg-white rounded-2xl shadow-[0_3px_8px_rgba(0,0,0,0.15)] flex items-center px-5">

        <button
          onClick={() => setActivePage("dashboard")}
          className="w-[48px] h-[48px] flex-shrink-0"
        >
          <img
            src="/mathventure-logo.png"
            alt="MathVenture"
            className="w-full h-full object-contain"
          />
        </button>

        <div className="flex items-center gap-9 ml-7">

          <NavItem
            label="Dashboard"
            active={activePage === "dashboard"}
            onClick={() => setActivePage("dashboard")}
          />

          <NavItem
            label="Kelola Materi"
            active={activePage === "materi"}
            onClick={() => setActivePage("materi")}
          />

          <NavItem
            label="Kelola Soal"
            active={activePage === "soal"}
            onClick={() => setActivePage("soal")}
          />

          <NavItem
            label="Kelola User"
            active={activePage === "user"}
            onClick={() => setActivePage("user")}
          />

        </div>

        <button
          onClick={() => setIsLoggedIn(false)}
          className="ml-auto text-[16px] font-bold hover:text-[#f35b8f] transition"
        >
          Keluar
        </button>

      </nav>


      {/* CONTENT */}

      {activePage === "dashboard" && <Dashboard />}

      {activePage === "materi" && (
        <SimplePage
          title="Kelola Materi"
          description="Kelola materi pembelajaran MathVenture."
          button="Tambah Materi"
          onBack={() => setActivePage("dashboard")}
        />
      )}

      {activePage === "soal" && (
        <SimplePage
          title="Kelola Soal"
          description="Kelola soal dan quiz MathVenture."
          button="Tambah Soal"
          onBack={() => setActivePage("dashboard")}
        />
      )}

      {activePage === "user" && (
        <SimplePage
          title="Kelola User"
          description="Kelola pengguna MathVenture."
          button="Tambah User"
          onBack={() => setActivePage("dashboard")}
        />
      )}

    </div>
  );
}


/* =====================================================
   NAV ITEM
===================================================== */

function NavItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative text-[16px] font-bold whitespace-nowrap transition ${
        active
          ? "text-[#f35b8f]"
          : "text-[#3d343b] hover:text-[#f35b8f]"
      }`}
    >
      {label}

      {active && (
        <span className="absolute left-0 right-0 -bottom-[10px] h-[2px] bg-[#f35b8f] rounded-full" />
      )}
    </button>
  );
}


/* =====================================================
   LOGIN
===================================================== */

function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <main className="min-h-screen bg-[#fffdf7] flex items-center justify-center px-5">

      <div className="w-full max-w-[430px]">

        <div className="flex justify-center mb-6">
          <img
            src="/mathventure-logo.png"
            alt="MathVenture"
            className="w-[105px] h-[105px] object-contain"
          />
        </div>

        <div className="text-center mb-8">

          <h1 className="text-[30px] font-extrabold text-[#3d343b]">
            Welcome Back!
          </h1>

          <p className="text-[14px] text-[#766d73] mt-2">
            Masuk ke Dashboard MathVenture
          </p>

        </div>


        <div className="bg-white rounded-3xl shadow-[0_5px_18px_rgba(0,0,0,0.10)] p-7">

          <div className="mb-5">

            <label className="block text-[14px] font-bold mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[46px] px-4 rounded-xl border border-[#eadfe4] outline-none focus:border-[#f35b8f] text-[14px]"
            />

          </div>


          <div className="mb-4">

            <label className="block text-[14px] font-bold mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[46px] px-4 rounded-xl border border-[#eadfe4] outline-none focus:border-[#f35b8f] text-[14px]"
            />

          </div>


          <label className="flex items-center gap-2 text-[13px] text-[#766d73] mb-6 cursor-pointer">

            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-[#f35b8f]"
            />

            Ingat saya

          </label>


          <button
            onClick={onLogin}
            className="w-full h-[48px] rounded-xl bg-[#f35b8f] text-white font-extrabold text-[15px] hover:bg-[#ed4c82] transition"
          >
            MASUK KE DASHBOARD
          </button>

        </div>

      </div>

    </main>
  );
}


/* =====================================================
   DASHBOARD
===================================================== */

function Dashboard() {
  return (
    <main className="px-6 pt-14 pb-14">

      <div className="max-w-[760px] mx-auto">

        {/* JUDUL DASHBOARD */}

        <div className="inline-block bg-[#fff0b8] px-5 py-2.5 rounded-2xl mb-9">

          <h1 className="text-[28px] font-extrabold text-[#3d343b]">
            Dashboard
          </h1>

        </div>


        {/* STATISTIK */}

        <div className="grid grid-cols-2 gap-7">

          {/* SISWA */}

          <div className="h-[195px] rounded-2xl bg-[#ded0fa] p-6">

            <img
              src="/siswa.png"
              alt="Siswa"
              className="w-[58px] h-[58px] object-contain mb-3"
            />

            <p className="text-[16px] font-bold">
              Total Siswa
            </p>

            <p className="text-[32px] leading-none font-extrabold mt-2">
              0
            </p>

          </div>


          {/* MATERI */}

          <div className="h-[195px] rounded-2xl bg-[#f8d3df] p-6">

            <img
              src="/materi.png"
              alt="Materi"
              className="w-[58px] h-[58px] object-contain mb-3"
            />

            <p className="text-[16px] font-bold">
              Total Materi
            </p>

            <p className="text-[32px] leading-none font-extrabold mt-2">
              0
            </p>

          </div>

        </div>


        {/* TOTAL SOAL */}

        <div className="flex justify-center mt-7">

          <div className="w-[345px] h-[195px] rounded-2xl bg-[#ccecf9] p-6">

            <img
              src="/soal.png"
              alt="Soal"
              className="w-[58px] h-[58px] object-contain mb-3"
            />

            <p className="text-[16px] font-bold">
              Total Soal
            </p>

            <p className="text-[32px] leading-none font-extrabold mt-2">
              0
            </p>

          </div>

        </div>


        {/* PENGELOLAAN */}

        <div className="mt-12">

          <h2 className="text-[21px] font-extrabold mb-5">
            Pengelolaan
          </h2>


          <div className="grid grid-cols-3 gap-4">

            {/* MATERI */}

            <div className="bg-white rounded-2xl p-5 shadow-[0_3px_10px_rgba(0,0,0,0.08)]">

              <div className="w-[45px] h-[45px] rounded-xl bg-[#f8d3df] flex items-center justify-center mb-3">

                <img
                  src="/materi.png"
                  alt="Materi"
                  className="w-[32px] h-[32px] object-contain"
                />

              </div>

              <p className="font-extrabold text-[14px]">
                Kelola Materi
              </p>

              <p className="text-[11px] text-[#8b8086] mt-1">
                Atur materi pembelajaran
              </p>

            </div>


            {/* SOAL */}

            <div className="bg-white rounded-2xl p-5 shadow-[0_3px_10px_rgba(0,0,0,0.08)]">

              <div className="w-[45px] h-[45px] rounded-xl bg-[#ccecf9] flex items-center justify-center mb-3">

                <img
                  src="/soal.png"
                  alt="Soal"
                  className="w-[32px] h-[32px] object-contain"
                />

              </div>

              <p className="font-extrabold text-[14px]">
                Kelola Soal
              </p>

              <p className="text-[11px] text-[#8b8086] mt-1">
                Atur soal dan quiz
              </p>

            </div>


            {/* USER */}

            <div className="bg-white rounded-2xl p-5 shadow-[0_3px_10px_rgba(0,0,0,0.08)]">

              <div className="w-[45px] h-[45px] rounded-xl bg-[#ded0fa] flex items-center justify-center mb-3">

                <img
                  src="/siswa.png"
                  alt="User"
                  className="w-[32px] h-[32px] object-contain"
                />

              </div>

              <p className="font-extrabold text-[14px]">
                Kelola User
              </p>

              <p className="text-[11px] text-[#8b8086] mt-1">
                Atur pengguna
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}


/* =====================================================
   SIMPLE PAGE
===================================================== */

function SimplePage({
  title,
  description,
  button,
  onBack,
}: {
  title: string;
  description: string;
  button: string;
  onBack: () => void;
}) {
  return (
    <main className="px-6 pt-14">

      <div className="max-w-[760px] mx-auto">

        <div className="inline-block bg-[#fff0b8] px-5 py-2.5 rounded-2xl mb-8">

          <h1 className="text-[28px] font-extrabold">
            {title}
          </h1>

        </div>


        <div className="bg-white rounded-2xl shadow-[0_3px_10px_rgba(0,0,0,0.08)] p-7">

          <p className="text-[#766d73] text-[14px] mb-6">
            {description}
          </p>

          <button className="px-5 py-3 rounded-xl bg-[#f35b8f] text-white font-bold text-[14px]">
            {button}
          </button>

        </div>


        <button
          onClick={onBack}
          className="mt-5 text-[#f35b8f] font-bold text-[14px]"
        >
          ← Kembali ke Dashboard
        </button>

      </div>

    </main>
  );
}