import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthFooter } from "@/components/auth/AuthForm";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Masuk" };

export default function LoginPage() {
  return (
    <>
      <Suspense fallback={<div className="py-8 text-center text-body-sm text-on-surface-variant">Memuat...</div>}>
        <LoginForm />
      </Suspense>
      <AuthFooter href="/register" text="Belum punya akun?" linkLabel="Daftar Akun Baru" />
    </>
  );
}
