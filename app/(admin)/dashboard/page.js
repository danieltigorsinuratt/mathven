import Placeholder from "@/components/Placeholder";

// ===== BAGIAN TEMAN TIM: Dashboard =====
// Hi-fi: layar 05 di PDF.
// Jumlah data bisa diambil dengan:
//   "use client";  (taruh di baris paling atas)
//   import { useData } from "@/lib/DataContext";
//   const { users, materi, soal } = useData();
//   users.length, materi.length, soal.length
export default function DashboardPage() {
  return <Placeholder title="Dashboard" route="/dashboard" file="app/(admin)/dashboard/page.js" />;
}
