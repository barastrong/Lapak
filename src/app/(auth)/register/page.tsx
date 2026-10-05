import type { Metadata } from "next";
import { AuthFooter } from "@/components/auth/AuthForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = { title: "Daftar Akun" };

export default function RegisterPage() {
  return (
    <>
      <RegisterForm />
      <AuthFooter href="/login" text="Sudah punya akun?" linkLabel="Masuk ke Akun" />
    </>
  );
}
