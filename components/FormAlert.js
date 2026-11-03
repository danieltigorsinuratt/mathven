import Icon from "./Icon";

// Kotak merah di atas formulir saat ada kolom yang belum diisi.
export default function FormAlert() {
  return (
    <div className="alert-error" role="alert">
      <Icon name="alert" size={19} />
      <div>
        <b>Data belum lengkap</b>
        Isi semua kolom yang ditandai merah, lalu klik Simpan lagi.
      </div>
    </div>
  );
}
