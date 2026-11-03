// Data contoh, sama dengan yang ada di hi-fi.
// Nanti kalau sudah pakai database, file ini bisa dihapus.

export const initialMateri = [
  { id: 1, judul: "Mengenal Bilangan", deskripsi: "Bilangan dapat diurutkan dari yang terkecil hingga terbesar dengan membandingkan nilai tempatnya." },
  { id: 2, judul: "Nilai Tempat", deskripsi: "Mengenal satuan, puluhan, dan ratusan" },
  { id: 3, judul: "Penjumlahan", deskripsi: "Penjumlahan bersusun hingga ratusan" },
  { id: 4, judul: "Pengurangan", deskripsi: "Pengurangan bersusun dengan meminjam" },
];

export const initialSoal = [
  { id: 1, materiId: 1, pertanyaan: "456", jawaban: "Empat Ratus Lima Puluh Enam" },
  { id: 2, materiId: 1, pertanyaan: "809", jawaban: "Delapan Ratus Sembilan" },
  { id: 3, materiId: 2, pertanyaan: "Angka 7 pada 372 bernilai ...", jawaban: "Puluhan" },
  { id: 4, materiId: 3, pertanyaan: "235 + 148 = ...", jawaban: "383" },
  { id: 5, materiId: 4, pertanyaan: "502 - 267 = ...", jawaban: "235" },
];

export const initialUsers = [
  { id: 1, nama: "Eca", kelas: "3 SD", sekolah: "SD Brawijaya" },
  { id: 2, nama: "Rafi Akbar", kelas: "3 SD", sekolah: "SD Brawijaya" },
  { id: 3, nama: "Naura Azzahra", kelas: "2 SD", sekolah: "SDN Sumbersari 1" },
  { id: 4, nama: "Daffa Pratama", kelas: "4 SD", sekolah: "SD Islam Malang" },
  { id: 5, nama: "Kirana Larasati", kelas: "3 SD", sekolah: "SDN Lowokwaru 3" },
];
