"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useData, type Materi, type Soal, type User } from "@/lib/DataContext";
import { Field, FormAlert } from "./ui";

type Errors = Record<string, string>;

function Actions({ cancelHref }: { cancelHref: string }) {
  return (
    <div className="form-actions">
      <Link href={cancelHref} className="btn btn-secondary">
        Batal
      </Link>
      <button type="submit" className="btn btn-primary">
        Simpan
      </button>
    </div>
  );
}

// ---------- Materi ----------
export function MateriForm({ materiLama }: { materiLama?: Materi }) {
  const router = useRouter();
  const { addMateri, updateMateri, showFlash } = useData();
  const [form, setForm] = useState({ judul: materiLama?.judul ?? "", deskripsi: materiLama?.deskripsi ?? "" });
  const [errors, setErrors] = useState<Errors>({});

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newErrors: Errors = {};
    if (!form.judul.trim()) newErrors.judul = "Judul materi wajib diisi.";
    if (!form.deskripsi.trim()) newErrors.deskripsi = "Deskripsi wajib diisi.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const data = { judul: form.judul.trim(), deskripsi: form.deskripsi.trim() };
    if (materiLama) updateMateri(materiLama.id, data);
    else addMateri(data);
    showFlash("Materi berhasil disimpan");
    router.push("/materi");
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit} noValidate>
      {Object.values(errors).some(Boolean) && <FormAlert />}
      <Field label="Judul Materi" htmlFor="judul" error={errors.judul}>
        <input id="judul" name="judul" value={form.judul} onChange={handleChange} placeholder="Masukkan judul materi" className={`input ${errors.judul ? "error" : ""}`} />
      </Field>
      <Field label="Deskripsi" htmlFor="deskripsi" error={errors.deskripsi}>
        <textarea id="deskripsi" name="deskripsi" value={form.deskripsi} onChange={handleChange} placeholder="Isi detail materi" className={`input ${errors.deskripsi ? "error" : ""}`} />
      </Field>
      <Actions cancelHref="/materi" />
    </form>
  );
}

// ---------- Soal ----------
export function SoalForm({ soalLama }: { soalLama?: Soal }) {
  const router = useRouter();
  const { materi, addSoal, updateSoal, showFlash } = useData();
  const [form, setForm] = useState({
    materiId: soalLama ? String(soalLama.materiId) : "",
    pertanyaan: soalLama?.pertanyaan ?? "",
    jawaban: soalLama?.jawaban ?? "",
  });
  const [errors, setErrors] = useState<Errors>({});

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newErrors: Errors = {};
    if (!form.materiId) newErrors.materiId = "Materi wajib dipilih.";
    if (!form.pertanyaan.trim()) newErrors.pertanyaan = "Pertanyaan wajib diisi.";
    if (!form.jawaban.trim()) newErrors.jawaban = "Jawaban wajib diisi.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const data = { materiId: Number(form.materiId), pertanyaan: form.pertanyaan.trim(), jawaban: form.jawaban.trim() };
    if (soalLama) {
      updateSoal(soalLama.id, data);
      showFlash("Soal berhasil diperbarui.");
    } else {
      addSoal(data);
      showFlash("Soal berhasil disimpan.");
    }
    router.push("/soal");
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit} noValidate>
      {Object.values(errors).some(Boolean) && <FormAlert />}
      <Field label="Materi" htmlFor="materiId" error={errors.materiId}>
        <select id="materiId" name="materiId" value={form.materiId} onChange={handleChange} className={`input ${errors.materiId ? "error" : ""} ${form.materiId ? "" : "is-empty"}`}>
          <option value="">Pilih materi</option>
          {materi.map((m) => (
            <option key={m.id} value={m.id}>
              {m.judul}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Pertanyaan" htmlFor="pertanyaan" error={errors.pertanyaan}>
        <input id="pertanyaan" name="pertanyaan" value={form.pertanyaan} onChange={handleChange} placeholder="Masukkan pertanyaan" className={`input ${errors.pertanyaan ? "error" : ""}`} />
      </Field>
      <Field label="Jawaban" htmlFor="jawaban" error={errors.jawaban}>
        <input id="jawaban" name="jawaban" value={form.jawaban} onChange={handleChange} placeholder="Masukkan jawaban" className={`input ${errors.jawaban ? "error" : ""}`} />
      </Field>
      <Actions cancelHref="/soal" />
    </form>
  );
}

// ---------- User ----------
const userFields = [
  { name: "nama", label: "Nama Lengkap", placeholder: "Masukkan nama lengkap", error: "Nama lengkap wajib diisi." },
  { name: "kelas", label: "Kelas", placeholder: "Masukkan kelas", error: "Kelas wajib diisi." },
  { name: "sekolah", label: "Asal Sekolah", placeholder: "Masukkan asal sekolah", error: "Asal sekolah wajib diisi." },
] as const;

export function UserForm({ userLama }: { userLama?: User }) {
  const router = useRouter();
  const { addUser, updateUser, showFlash } = useData();
  const [form, setForm] = useState({ nama: userLama?.nama ?? "", kelas: userLama?.kelas ?? "", sekolah: userLama?.sekolah ?? "" });
  const [errors, setErrors] = useState<Errors>({});

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newErrors: Errors = {};
    for (const f of userFields) if (!form[f.name].trim()) newErrors[f.name] = f.error;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const data = { nama: form.nama.trim(), kelas: form.kelas.trim(), sekolah: form.sekolah.trim() };
    if (userLama) {
      updateUser(userLama.id, data);
      showFlash("User berhasil diperbarui.");
    } else {
      addUser(data);
      showFlash("User berhasil disimpan.");
    }
    router.push("/user");
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit} noValidate>
      {Object.values(errors).some(Boolean) && <FormAlert />}
      {userFields.map((f) => (
        <Field key={f.name} label={f.label} htmlFor={f.name} error={errors[f.name]}>
          <input id={f.name} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} className={`input ${errors[f.name] ? "error" : ""}`} />
        </Field>
      ))}
      <Actions cancelHref="/user" />
    </form>
  );
}
