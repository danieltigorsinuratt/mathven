import PageHeader from "@/components/PageHeader";

// Ganti angka ini dengan data asli dari database / API kamu.
const STATS = [
  { label: "Total Siswa", value: 5 },
  { label: "Total Materi", value: 4 },
  { label: "Total Soal", value: 5 },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Ringkasan data MathVenture" />
      <div className="cards">
        {STATS.map((s) => (
          <div className="card" key={s.label}>
            <div className="card__label">{s.label}</div>
            <div className="card__value">{s.value}</div>
          </div>
        ))}
      </div>
    </>
  );
}
