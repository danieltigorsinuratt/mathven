import Link from "next/link";

// Halaman sementara untuk bagian yang dikerjakan teman tim.
// Hapus pemanggilan <Placeholder /> dan ganti dengan desain hi-fi kalau sudah mulai mengerjakan.
export default function Placeholder({ title, route, file, links = [] }) {
  return (
    <div className="placeholder">
      <h1>{title}</h1>
      <p>Halaman ini belum dikerjakan.</p>
      <p>
        Alamat: <code>{route}</code>
      </p>
      <p>
        File: <code>{file}</code>
      </p>
      {links.length > 0 && (
        <div className="links">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="btn btn-secondary">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
