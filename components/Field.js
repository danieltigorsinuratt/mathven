import Icon from "./Icon";

// Pembungkus satu kolom formulir: label, input, dan pesan error.
// Contoh:
//   <Field label="Jawaban" htmlFor="jawaban" error={errors.jawaban}>
//     <input id="jawaban" ... />
//   </Field>
export default function Field({ label, htmlFor, error, children }) {
  return (
    <div className="field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {error && (
        <div className="error-text">
          <Icon name="alert" size={15} />
          {error}
        </div>
      )}
    </div>
  );
}
