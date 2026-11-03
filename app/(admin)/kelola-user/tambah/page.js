import PageHeader from "@/components/PageHeader";
import UserForm from "@/components/UserForm";

// Halaman Tambah User (hi-fi layar 14 sampai 16)
// Alamat: /kelola-user/tambah
export default function TambahUserPage() {
  return (
    <>
      <PageHeader title="Tambah User" description="Isi semua kolom, lalu klik Simpan." />
      <UserForm />
    </>
  );
}
