"use client";

import { useState } from "react";
import Link from "next/link";
import { useData } from "@/lib/DataContext";
import PageHeader from "@/components/PageHeader";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

// Halaman Kelola User (hi-fi layar 17)
// Alamat: /kelola-user
export default function KelolaUserPage() {
  const { users, deleteUser, showFlash } = useData();
  const [akanDihapus, setAkanDihapus] = useState(null); // user yang sedang ditanya "yakin hapus?"

  function handleConfirmHapus() {
    deleteUser(akanDihapus.id);
    showFlash("User berhasil dihapus.");
    setAkanDihapus(null);
  }

  return (
    <>
      <PageHeader
        title="Kelola User"
        description={`Ada ${users.length} siswa.`}
        buttonLabel="Tambah User"
        buttonHref="/kelola-user/tambah"
      />

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "34%" }}>Nama lengkap</th>
              <th>Kelas</th>
              <th>Asal sekolah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="empty">
                  Belum ada user. Klik Tambah User untuk menambahkan.
                </td>
              </tr>
            )}
            {users.map((item) => (
              <tr key={item.id}>
                <td className="strong">{item.nama}</td>
                <td>{item.kelas}</td>
                <td>{item.sekolah}</td>
                <td>
                  <div className="row-actions">
                    <Link href={`/kelola-user/${item.id}/edit`} className="btn-small">
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
        title="Hapus User?"
        itemName={akanDihapus?.nama}
        isOpen={Boolean(akanDihapus)}
        onConfirm={handleConfirmHapus}
        onCancel={() => setAkanDihapus(null)}
      />
    </>
  );
}