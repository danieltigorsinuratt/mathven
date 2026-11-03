import PageHeader from "@/components/PageHeader";
import SoalForm from "@/components/SoalForm";

// Halaman Tambah Soal (hi-fi layar 10 sampai 12)
// Alamat: /kelola-soal/tambah
export default function TambahSoalPage() {
  return (
    <>
      <PageHeader title="Tambah Soal" description="Isi semua kolom, lalu klik Simpan." />
      <SoalForm />
    </>
  );
}
