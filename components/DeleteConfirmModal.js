"use client";

// Jendela konfirmasi sebelum menghapus data.
// Dipakai di halaman Kelola Soal dan Kelola User.
//
// Contoh:
//   <DeleteConfirmModal
//     title="Hapus Soal?"
//     itemName={soalYangDihapus?.pertanyaan}
//     isOpen={Boolean(soalYangDihapus)}
//     onConfirm={hapus}
//     onCancel={() => setSoalYangDihapus(null)}
//   />
export default function DeleteConfirmModal({ title, itemName, isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      {/* stopPropagation: klik di dalam kotak tidak ikut menutup modal */}
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>
          Apakah Anda yakin ingin menghapus <strong>&ldquo;{itemName}&rdquo;</strong>? Data yang dihapus tidak dapat
          dikembalikan.
        </p>
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Batal
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}