import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthFooter } from "@/components/auth/AuthForm";
import { OtpForm } from "@/components/auth/OtpForm";

export const metadata: Metadata = { title: "Verifikasi Kode OTP" };

export default function OtpPage() {
  return (
    <>
      <Suspense fallback={<div className="py-8 text-center text-body-sm text-on-surface-variant">Memuat...</div>}>
        <OtpForm />
      </Suspense>
      <AuthFooter href="/login" text="Ingin batalkan?" linkLabel="Kembali ke Masuk" />
    </>
  );
}
