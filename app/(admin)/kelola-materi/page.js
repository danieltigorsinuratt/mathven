import Placeholder from "@/components/Placeholder";

// ===== BAGIAN TEMAN TIM: Kelola Materi =====
// Hi-fi: layar 09 di PDF.
// Contoh lengkap bisa dilihat di app/(admin)/kelola-soal/page.js (polanya sama).
// Fungsi data yang sudah siap: materi, addMateri, updateMateri, deleteMateri (dari useData()).
export default function KelolaMateriPage() {
  return (
    <Placeholder
      title="Kelola Materi"
      route="/kelola-materi"
      file="app/(admin)/kelola-materi/page.js"
      links={[{ href: "/kelola-materi/tambah", label: "Ke Tambah Materi" }]}
    />
  );
}
