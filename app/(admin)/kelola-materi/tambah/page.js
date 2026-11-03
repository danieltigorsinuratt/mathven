import Placeholder from "@/components/Placeholder";

// ===== BAGIAN TEMAN TIM: Tambah Materi =====
// Hi-fi: layar 06 sampai 08 di PDF.
// Contoh lengkap bisa dilihat di components/SoalForm.js (validasi kolom kosong sudah ada di sana).
export default function TambahMateriPage() {
  return (
    <Placeholder
      title="Tambah Materi"
      route="/kelola-materi/tambah"
      file="app/(admin)/kelola-materi/tambah/page.js"
      links={[{ href: "/kelola-materi", label: "Kembali ke Kelola Materi" }]}
    />
  );
}
