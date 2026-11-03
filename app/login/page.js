import Placeholder from "@/components/Placeholder";

// ===== BAGIAN TEMAN TIM: Halaman Login =====
// Hi-fi: layar 01 sampai 04 di PDF.
// Hapus <Placeholder /> lalu ganti dengan desain login.
// Setelah login berhasil, arahkan ke "/dashboard" dengan useRouter().push("/dashboard").
export default function LoginPage() {
  return (
    <div className="center-page">
      <Placeholder
        title="Login Admin"
        route="/login"
        file="app/login/page.js"
        links={[{ href: "/dashboard", label: "Masuk (sementara)" }]}
      />
    </div>
  );
}
