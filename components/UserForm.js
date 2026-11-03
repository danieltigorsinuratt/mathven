"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useData } from "@/lib/DataContext";
import Field from "./Field";
import FormAlert from "./FormAlert";

// Formulir user (siswa). Dipakai di dua halaman:
//   - Tambah User: <UserForm />
//   - Edit User:   <UserForm userLama={...} />
export default function UserForm({ userLama }) {
  const router = useRouter();
  const { addUser, updateUser, showFlash } = useData();
  const isEdit = Boolean(userLama);

  const [form, setForm] = useState({
    nama: userLama ? userLama.nama : "",
    kelas: userLama ? userLama.kelas : "",
    sekolah: userLama ? userLama.sekolah : "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  }

  // Cek kolom kosong (error flow di hi-fi layar 16)
  function validate() {
    const newErrors = {};
    if (!form.nama.trim()) newErrors.nama = "Nama lengkap wajib diisi.";
    if (!form.kelas.trim()) newErrors.kelas = "Kelas wajib diisi.";
    if (!form.sekolah.trim()) newErrors.sekolah = "Asal sekolah wajib diisi.";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const data = {
      nama: form.nama.trim(),
      kelas: form.kelas.trim(),
      sekolah: form.sekolah.trim(),
    };

    if (isEdit) {
      updateUser(userLama.id, data);
      showFlash("User berhasil diperbarui.");
    } else {
      addUser(data);
      showFlash("User berhasil disimpan.");
    }
    router.push("/kelola-user");
  }

  const adaError = Object.values(errors).some(Boolean);

  // Supaya tidak menulis input 3 kali, kolom dibuat dari daftar ini
  const kolom = [
    { name: "nama", label: "Nama Lengkap", placeholder: "Masukkan nama lengkap" },
    { name: "kelas", label: "Kelas", placeholder: "Masukkan kelas" },
    { name: "sekolah", label: "Asal Sekolah", placeholder: "Masukkan asal sekolah" },
  ];

  return (
    <form className="card form-card" onSubmit={handleSubmit} noValidate>
      {adaError && <FormAlert />}

      {kolom.map((k) => (
        <Field key={k.name} label={k.label} htmlFor={k.name} error={errors[k.name]}>
          <input
            id={k.name}
            name={k.name}
            value={form[k.name]}
            onChange={handleChange}
            placeholder={k.placeholder}
            className={`input ${errors[k.name] ? "error" : ""}`}
          />
        </Field>
      ))}

      <div className="form-actions">
        <Link href="/kelola-user" className="btn btn-secondary">
          Batal
        </Link>
        <button type="submit" className="btn btn-primary">
          Simpan
        </button>
      </div>
    </form>
  );
}
