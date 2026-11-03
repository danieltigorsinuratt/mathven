import type { Metadata } from "next";
import Brand from "@/components/Brand";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Masuk | MathVenture Admin Panel",
};

export default function LoginPage() {
  return (
    <main className="login">
      <section className="login__left">
        <Brand />
        <div className="login__hero">
          <h2 className="login__headline">
            Kelola materi, soal, dan
            <br />
            siswa MathVenture.
          </h2>
          <p className="login__note">Halaman ini khusus untuk admin.</p>
        </div>
      </section>

      <section className="login__right">
        <LoginForm />
      </section>
    </main>
  );
}
