"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useData } from "@/lib/DataContext";
import PageHeader from "@/components/PageHeader";
import SoalForm from "@/components/SoalForm";

// Halaman Edit Soal
// Alamat: /kelola-soal/1/edit, /kelola-soal/2/edit, dst.
// Folder [id] artinya bagian alamat itu bisa berisi angka apa saja.
export default function EditSoalPage() {
  const { id } = useParams();
  const { soal } = useData();
  const soalLama = soal.find((item) => item.id === Number(id));

  if (!soalLama) {
    return (
      <>
        <PageHeader title="Soal tidak ditemukan" description="Soal ini mungkin sudah dihapus." />
        <Link href="/kelola-soal" className="btn btn-secondary">
          Kembali ke Kelola Soal
        </Link>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Edit Soal" description="Ubah kolom yang perlu, lalu klik Simpan." />
      <SoalForm soalLama={soalLama} />
    </>
  );
}
