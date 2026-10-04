import type { Metadata } from "next";
import { Be_Vietnam_Pro, Bricolage_Grotesque, Space_Mono } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Lapak — Kasir & Buku Warung",
    template: "%s | Lapak",
  },
  description: "Aplikasi kasir praktis dan pencatatan buku warung harian digital untuk UMKM Indonesia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${beVietnam.variable} ${bricolage.variable} ${spaceMono.variable}`}>
      <body className="bg-surface text-on-surface font-body-md text-body-md antialiased">
        {children}
      </body>
    </html>
  );
}