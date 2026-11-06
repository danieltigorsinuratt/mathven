"use client";

import PageHeader from "@/components/PageHeader";
import { useData } from "@/lib/DataContext";

export default function DashboardPage() {
  const { users, materi, soal, loading, error, refreshData } = useData();

  const stats = [
    { label: "Total Siswa", value: loading ? "..." : users.length },
    { label: "Total Materi", value: loading ? "..." : materi.length },
    { label: "Total Soal", value: loading ? "..." : soal.length },
  ];

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Ringkasan data MathVenture (Tersinkronisasi dengan Database)" />
      {error && (
        <div className="alert-error" role="alert" style={{ marginBottom: 16 }}>
          <div>
            <b>Gagal memuat data dari Backend</b>
            <div>{error}</div>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => void refreshData()} style={{ marginLeft: "auto" }}>
            Coba Lagi
          </button>
        </div>
      )}
      <div className="cards">
        {stats.map((s) => (
          <div className="card" key={s.label}>
            <div className="card__label">{s.label}</div>
            <div className="card__value">{s.value}</div>
          </div>
        ))}
      </div>
    </>
  );
}
