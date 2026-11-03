import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Toast from "@/components/Toast";

// Layout untuk semua halaman admin (yang ada sidebar-nya).
// Folder "(admin)" pakai tanda kurung, jadi TIDAK ikut muncul di alamat.
// Contoh: app/(admin)/kelola-soal/page.js  ->  http://localhost:3000/kelola-soal
export default function AdminLayout({ children }) {
  return (
    <div className="admin">
      <Sidebar />
      <div className="main">
        <Topbar />
        <main className="content">{children}</main>
      </div>
      <Toast />
    </div>
  );
}
