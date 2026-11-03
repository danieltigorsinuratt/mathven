export default function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="page-header">
      <h1 className="page-header__title">{title}</h1>
      <p className="page-header__sub">{subtitle}</p>
    </div>
  );
}
