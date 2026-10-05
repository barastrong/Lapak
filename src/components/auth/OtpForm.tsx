"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthForm, OtpBoxes } from "./AuthForm";
import { Icon } from "@/components/ui/Icon";

export function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailParam = searchParams.get("email") || "";
  const purpose = searchParams.get("purpose") || "register";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCountdown, setResendCountdown] = useState(60);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setInterval(() => {
      setResendCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCountdown]);

  const handleResend = () => {
    setResendCountdown(60);
    setInfoMessage("Kode OTP baru telah berhasil dikirim.");
    setError("");
    setTimeout(() => setInfoMessage(""), 4000);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim().length !== 6) {
      setError("Masukkan 6 digit kode OTP lengkap.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (purpose === "reset") {
        router.push(
          `/reset-password?step=password&email=${encodeURIComponent(emailParam)}&verified=true`
        );
      } else {
        router.push("/login?registered=success");
      }
    }, 600);
  };

  const title =
    purpose === "reset"
      ? "Verifikasi Kode OTP"
      : purpose === "register"
      ? "Aktivasi Akun"
      : "Verifikasi OTP";

  const subtitle = emailParam
    ? `Kode 6 digit telah dikirim ke ${emailParam}.`
    : "Masukkan kode 6 digit verifikasi yang telah dikirimkan.";

  return (
    <AuthForm
      title={title}
      subtitle={subtitle}
      submitLabel="Verifikasi OTP"
      loading={loading}
      onDone={handleVerify}
    >
      {infoMessage ? (
        <div className="p-3 bg-white border border-green-200 border-l-4 border-l-green-600 rounded-xl text-body-sm flex items-center gap-3 shadow-xs">
          <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 1118 0z" />
          </svg>
          <span className="font-medium text-slate-800">{infoMessage}</span>
        </div>
      ) : null}

      {error ? (
        <div className="p-2.5 bg-error-container text-on-error-container rounded-lg text-body-sm">
          {error}
        </div>
      ) : null}

      <div className="my-2">
        <label className="block text-center font-label-ui text-label-ui text-on-surface mb-2">
          Masukkan 6 Digit Kode
        </label>
        <OtpBoxes value={otp} onChange={setOtp} disabled={loading} />
      </div>

      <div className="bg-surface-container-low/60 rounded-lg p-2.5 text-center text-body-sm text-on-surface-variant flex items-center justify-center gap-1.5">
        <Icon name="info" className="text-base text-primary" />
        <span>Simulasi OTP: Masukkan 6 angka sembarang (contoh: <strong>123456</strong>)</span>
      </div>

      <div className="flex items-center justify-between text-body-sm pt-2">
        {resendCountdown > 0 ? (
          <span className="text-on-surface-variant">
            Kirim ulang dalam <strong className="text-on-surface font-label-numeric">{resendCountdown}d</strong>
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-primary font-label-ui hover:underline cursor-pointer"
          >
            Kirim Ulang Kode OTP
          </button>
        )}

        <Link
          href={purpose === "reset" ? "/reset-password" : "/register"}
          className="text-on-surface-variant hover:text-on-surface hover:underline text-body-sm"
        >
          {purpose === "reset" ? "Ganti email" : "Ganti nomor"}
        </Link>
      </div>
    </AuthForm>
  );
}
