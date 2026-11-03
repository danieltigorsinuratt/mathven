import { Inter } from "next/font/google";
import { DataProvider } from "@/lib/DataContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "MathVenture Admin",
  description: "Admin panel MathVenture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable}>
      <body>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
