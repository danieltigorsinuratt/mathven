"use client";

import { useState } from "react";
import Link from "next/link";
import { useData, type Materi } from "@/lib/DataContext";
import { CrudHeader, DeleteConfirmModal } from "@/components/crud/ui";

export default function MateriPage() {
  const { materi, deleteMateri, showFlash } = useData();
  const [akanDihapus, setAkanDihapus] = useState<Materi | null>(null);

  function handleConfirmHapus() {
    if (!akanDihapus) return;
    deleteMateri(akanDihapus.id);
    showFlash("Materi berhasil dihapus.");
    setAkanDihapus(null);
  }

  return (
    <>
      <CrudHeader title="Kelola Materi" description={`Ada ${materi.length} materi.`} buttonLabel="Tambah Materi" buttonHref="/materi/tambah" />

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Judul Materi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {materi.length === 0 && (
              <tr>
                <td colSpan={2} className="empty">
                  Belum ada materi. Klik Tambah Materi untuk menambahkan.
                </td>
              </tr>
            )}
            {materi.map((item) => (
              <tr key={item.id}>
                <td className="with-sub">
                  <div className="cell-title">{item.judul}</div>
                  <div className="cell-sub">{item.deskripsi}</div>
                </td>
                <td>
                  <div className="row-actions">
                    <Link href={`/materi/${item.id}/edit`} className="btn-small">
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

      <DeleteConfirmModal title="Hapus Materi?" itemName={akanDihapus?.judul} isOpen={Boolean(akanDihapus)} onConfirm={handleConfirmHapus} onCancel={() => setAkanDihapus(null)} />
    </>
  );
}
