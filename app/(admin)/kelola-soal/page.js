"use client";

import { useState } from "react";
import Link from "next/link";
import { useData } from "@/lib/DataContext";
import PageHeader from "@/components/PageHeader";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

// Halaman Kelola Soal (hi-fi layar 13)
// Alamat: /kelola-soal
export default function KelolaSoalPage() {
  const { soal, materi, deleteSoal, showFlash } = useData();
  const [akanDihapus, setAkanDihapus] = useState(null); // soal yang sedang ditanya "yakin hapus?"

  // Mencari judul materi dari id-nya
  function namaMateri(materiId) {
    const m = materi.find((item) => item.id === materiId);
    return m ? m.judul : "-";
  }

  function handleConfirmHapus() {
    deleteSoal(akanDihapus.id);
    showFlash("Soal berhasil dihapus.");
    setAkanDihapus(null);
  }

  return (
    <>
      <PageHeader
        title="Kelola Soal"
        description={`Ada ${soal.length} soal.`}
        buttonLabel="Tambah Soal"
        buttonHref="/kelola-soal/tambah"
      />

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "34%" }}>Pertanyaan</th>
              <th>Jawaban</th>
              <th>Materi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {soal.length === 0 && (
              <tr>
                <td colSpan={4} className="empty">
                  Belum ada soal. Klik Tambah Soal untuk menambahkan.
                </td>
              </tr>
            )}
            {soal.map((item) => (
              <tr key={item.id}>
                <td className="strong">{item.pertanyaan}</td>
                <td>{item.jawaban}</td>
                <td>
                  <span className="tag">{namaMateri(item.materiId)}</span>
                </td>
                <td>
                  <div className="row-actions">
                    <Link href={`/kelola-soal/${item.id}/edit`} className="btn-small">
                      Edit
                    </Link>
                    <button type="button" className="btn-small danger" onClick={() => setAkanDihapus(item)}>
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteConfirmModal
        title="Hapus Soal?"
        itemName={akanDihapus?.pertanyaan}
        isOpen={Boolean(akanDihapus)}
        onConfirm={handleConfirmHapus}
        onCancel={() => setAkanDihapus(null)}
      />
    </>
  );
}