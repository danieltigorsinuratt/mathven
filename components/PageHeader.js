import Link from "next/link";
import Icon from "./Icon";

// Judul halaman + keterangan + (opsional) tombol di kanan.
// Contoh: <PageHeader title="Kelola Soal" description="Ada 5 soal." buttonLabel="Tambah Soal" buttonHref="/kelola-soal/tambah" />
export default function PageHeader({ title, description, buttonLabel, buttonHref }) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {buttonLabel && (
        <Link href={buttonHref} className="btn btn-primary">
          <Icon name="plus" size={17} />
          {buttonLabel}
        </Link>
      )}
    </div>
  );
}
