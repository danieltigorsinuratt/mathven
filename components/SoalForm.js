"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useData } from "@/lib/DataContext";
import Field from "./Field";
import FormAlert from "./FormAlert";

// Formulir soal. Dipakai di dua halaman:
//   - Tambah Soal: <SoalForm />
//   - Edit Soal:   <SoalForm soalLama={...} />
export default function SoalForm({ soalLama }) {
  const router = useRouter();
  const { materi, addSoal, updateSoal, showFlash } = useData();
  const isEdit = Boolean(soalLama);

  const [form, setForm] = useState({
    materiId: soalLama ? String(soalLama.materiId) : "",
    pertanyaan: soalLama ? soalLama.pertanyaan : "",
    jawaban: soalLama ? soalLama.jawaban : "",
  });
  const [errors, setErrors] = useState({});

  // Dipanggil setiap kali admin mengetik / memilih
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Pesan error kolom itu langsung hilang saat admin mulai mengisi
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  }

  // Cek kolom kosong (error flow di hi-fi layar 12)
  function validate() {
    const newErrors = {};
    if (!form.materiId) newErrors.materiId = "Materi wajib dipilih.";
    if (!form.pertanyaan.trim()) newErrors.pertanyaan = "Pertanyaan wajib diisi.";
    if (!form.jawaban.trim()) newErrors.jawaban = "Jawaban wajib diisi.";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return; // berhenti, data tidak disimpan

    const data = {
      materiId: Number(form.materiId),
      pertanyaan: form.pertanyaan.trim(),
      jawaban: form.jawaban.trim(),
    };

    if (isEdit) {
      updateSoal(soalLama.id, data);
      showFlash("Soal berhasil diperbarui.");
    } else {
      addSoal(data);
      showFlash("Soal berhasil disimpan.");
    }
    router.push("/kelola-soal");
  }

  const adaError = Object.values(errors).some(Boolean);

  return (
    <form className="card form-card" onSubmit={handleSubmit} noValidate>
      {adaError && <FormAlert />}

      <Field label="Materi" htmlFor="materiId" error={errors.materiId}>
        <select
          id="materiId"
          name="materiId"
          value={form.materiId}
          onChange={handleChange}
          className={`input ${errors.materiId ? "error" : ""} ${form.materiId ? "" : "is-empty"}`}
        >
          <option value="">Pilih materi</option>
          {materi.map((m) => (
            <option key={m.id} value={m.id}>
              {m.judul}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Pertanyaan" htmlFor="pertanyaan" error={errors.pertanyaan}>
        <input
          id="pertanyaan"
          name="pertanyaan"
          value={form.pertanyaan}
          onChange={handleChange}
          placeholder="Masukkan pertanyaan"
          className={`input ${errors.pertanyaan ? "error" : ""}`}
        />
      </Field>

      <Field label="Jawaban" htmlFor="jawaban" error={errors.jawaban}>
        <input
          id="jawaban"
          name="jawaban"
          value={form.jawaban}
          onChange={handleChange}
          placeholder="Masukkan jawaban"
          className={`input ${errors.jawaban ? "error" : ""}`}
        />
      </Field>

      <div className="form-actions">
        <Link href="/kelola-soal" className="btn btn-secondary">
          Batal
        </Link>
        <button type="submit" className="btn btn-primary">
          Simpan
        </button>
      </div>
    </form>
  );
}
