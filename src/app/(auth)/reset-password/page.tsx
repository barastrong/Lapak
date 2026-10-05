import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthFooter } from "@/components/auth/AuthForm";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = { title: "Reset Password" };

export default function ResetPasswordPage() {
  return (
    <>
      <Suspense fallback={<div className="py-8 text-center text-body-sm text-on-surface-variant">Memuat...</div>}>
        <ResetPasswordForm />
      </Suspense>
      <AuthFooter href="/login" text="Ingat password Anda?" linkLabel="Kembali ke Masuk" />
    </>
  );
}
