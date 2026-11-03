import { redirect } from "next/navigation";

// Membuka "/" langsung diarahkan ke halaman login.
export default function Home() {
  redirect("/login");
}
