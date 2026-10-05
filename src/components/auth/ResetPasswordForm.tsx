"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthForm, AuthField, OtpBoxes } from "./AuthForm";
import { Icon } from "@/components/ui/Icon";

type Step = "email" | "otp" | "password";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialEmail = searchParams.get("email") || "";
  const initialStepParam = searchParams.get("step") as Step | null;
  const isVerified = searchParams.get("verified") === "true";

  const initialStep: Step =
    initialStepParam === "password" && (isVerified || initialEmail)
      ? "password"
      : initialStepParam === "otp" && initialEmail
      ? "otp"
      : "email";

  const [step, setStep] = useState<Step>(initialStep);
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);

  useEffect(() => {
    if (step !== "otp" || resendCountdown <= 0) return;
    const timer = setInterval(() => {
      setResendCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [step, resendCountdown]);

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Masukkan alamat email Anda.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Format email tidak valid.");
      return;
    }

    setError("");
    setLoading(true);
    setSystemStatus("Memverifikasi email di sistem...");

    setTimeout(() => {
      setSystemStatus("Email terverifikasi! Sistem mengirimkan kode OTP...");
      setTimeout(() => {
        setLoading(false);
        setSystemStatus("");
        setResendCountdown(60);
        setStep("otp");
        window.history.replaceState(null, "", `/reset-password?step=otp&email=${encodeURIComponent(email)}`);
      }, 700);
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim().length !== 6) {
      setError("Kode OTP harus berupa 6 digit angka.");
      return;
    }

    setError("");
    setLoading(true);
    setSystemStatus("Memverifikasi kode OTP...");

    setTimeout(() => {
      setLoading(false);
      setSystemStatus("");
      setStep("password");
      window.history.replaceState(
        null,
        "",
        `/reset-password?step=password&email=${encodeURIComponent(email)}&verified=true`
      );
    }, 700);
  };

  const handleResendOtp = () => {
    setResendCountdown(60);
    setError("");
    setSystemStatus("Sistem telah mengirim ulang kode OTP ke email Anda.");
    setTimeout(() => setSystemStatus(""), 4000);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError("Kedua kolom password harus diisi.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password baru minimal 8 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password baru tidak cocok.");
      return;
    }

    setError("");
    setLoading(true);
    setSystemStatus("Menyimpan password baru di sistem...");

    setTimeout(() => {
      setLoading(false);
      setSystemStatus("");
      setSuccess(true);
      setTimeout(() => {
        router.push("/login?reset=success");
      }, 2000);
    }, 800);
  };

  if (success) {
    return (
      <div className="text-center py-4">
        <div className="w-14 h-14 mx-auto mb-4 bg-emerald-100 border border-emerald-300 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-2">
          Password Berhasil Diubah!
        </h2>
        <p className="text-body-sm text-on-surface-variant mb-6">
          Password akun untuk <strong>{email}</strong> telah diperbarui di sistem. Mengalihkan ke halaman masuk...
        </p>
        <button
          type="button"
          onClick={() => router.push("/login?reset=success")}
          className="w-full bg-primary text-on-primary rounded-xl font-label-ui text-label-ui py-3 hover:bg-primary-container transition-all cursor-pointer"
        >
          Masuk Sekarang
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step === "email"
                ? "bg-primary text-on-primary"
                : "bg-tertiary text-on-tertiary"
            }`}
          >
            {step !== "email" ? "✓" : "1"}
          </span>
          <span
            className={`text-body-sm ${
              step === "email" ? "font-bold text-on-surface" : "text-on-surface-variant"
            }`}
          >
            Email
          </span>
        </div>

        <div
          className={`flex-1 h-0.5 mx-2 transition-all ${
            step !== "email" ? "bg-tertiary" : "bg-surface-container-high"
          }`}
        />

        <div className="flex items-center gap-1.5">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step === "otp"
                ? "bg-primary text-on-primary"
                : step === "password"
                ? "bg-tertiary text-on-tertiary"
                : "bg-surface-container-high text-on-surface-variant"
            }`}
          >
            {step === "password" ? "✓" : "2"}
          </span>
          <span
            className={`text-body-sm ${
              step === "otp" ? "font-bold text-on-surface" : "text-on-surface-variant"
            }`}
          >
            OTP
          </span>
        </div>

        <div
          className={`flex-1 h-0.5 mx-2 transition-all ${
            step === "password" ? "bg-tertiary" : "bg-surface-container-high"
          }`}
        />

        <div className="flex items-center gap-1.5">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step === "password"
                ? "bg-primary text-on-primary"
                : "bg-surface-container-high text-on-surface-variant"
            }`}
          >
            3
          </span>
          <span
            className={`text-body-sm ${
              step === "password" ? "font-bold text-on-surface" : "text-on-surface-variant"
            }`}
          >
            Password
          </span>
        </div>
      </div>

      {systemStatus ? (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-950 rounded-xl text-body-sm flex items-center gap-2.5">
          <span className="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
          <span className="font-medium text-blue-900">{systemStatus}</span>
        </div>
      ) : null}

      {error ? (
        <div className="mb-4 p-2.5 bg-error-container text-on-error-container rounded-lg text-body-sm">
          {error}
        </div>
      ) : null}

      {step === "email" ? (
        <AuthForm
          title="Verifikasi Email"
          subtitle="Masukkan email akun Anda untuk diverifikasi oleh sistem sebelum menerima OTP."
          submitLabel="Verifikasi & Kirim OTP"
          loading={loading}
          onDone={handleVerifyEmail}
        >
          <AuthField
            label="Email Akun"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="warung@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </AuthForm>
      ) : null}

      {step === "otp" ? (
        <AuthForm
          title="Masukkan Kode OTP"
          subtitle={`Sistem telah mengirim kode 6 digit ke ${email}.`}
          submitLabel="Verifikasi Kode OTP"
          loading={loading}
          onDone={handleVerifyOtp}
        >
          <div className="my-2">
            <label className="block text-center font-label-ui text-label-ui text-on-surface mb-2">
              Kode OTP 6 Digit
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
                onClick={handleResendOtp}
                className="text-primary font-label-ui hover:underline cursor-pointer"
              >
                Kirim Ulang OTP
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setError("");
                setStep("email");
                window.history.replaceState(null, "", "/reset-password?step=email");
              }}
              className="text-on-surface-variant hover:text-on-surface hover:underline cursor-pointer"
            >
              Ganti Email
            </button>
          </div>
        </AuthForm>
      ) : null}

      {step === "password" ? (
        <AuthForm
          title="Reset Password Baru"
          subtitle={`Buat password baru yang aman untuk akun ${email}.`}
          submitLabel="Simpan Password Baru"
          loading={loading}
          onDone={handleResetPassword}
        >
          <AuthField
            label="Password Baru"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Minimal 8 karakter"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            autoFocus
          />
          <AuthField
            label="Konfirmasi Password Baru"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Ulangi password baru"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="flex flex-col gap-1 text-body-sm text-on-surface-variant pt-1">
            <span className={newPassword.length >= 8 ? "text-tertiary" : ""}>
              • Minimal 8 karakter
            </span>
            <span
              className={
                confirmPassword && newPassword === confirmPassword
                  ? "text-tertiary"
                  : ""
              }
            >
              • Konfirmasi password harus cocok
            </span>
          </div>
        </AuthForm>
      ) : null}
    </div>
  );
}
