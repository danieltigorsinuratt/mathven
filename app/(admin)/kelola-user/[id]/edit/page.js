"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useData } from "@/lib/DataContext";
import PageHeader from "@/components/PageHeader";
import UserForm from "@/components/UserForm";

// Halaman Edit User
// Alamat: /kelola-user/1/edit, /kelola-user/2/edit, dst.
export default function EditUserPage() {
  const { id } = useParams();
  const { users } = useData();
  const userLama = users.find((item) => item.id === Number(id));

  if (!userLama) {
    return (
      <>
        <PageHeader title="User tidak ditemukan" description="User ini mungkin sudah dihapus." />
        <Link href="/kelola-user" className="btn btn-secondary">
          Kembali ke Kelola User
        </Link>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Edit User" description="Ubah kolom yang perlu, lalu klik Simpan." />
      <UserForm userLama={userLama} />
    </>
  );
}
