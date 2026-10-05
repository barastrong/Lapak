"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthForm, AuthField } from "./AuthForm";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetSuccess = searchParams.get("reset") === "success";
  const registeredSuccess = searchParams.get("registered") === "success";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim() || !password.trim()) {
      setError("Email/No HP dan password wajib diisi");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div>
      {resetSuccess ? (
        <div className="mb-4 p-3.5 bg-white border border-green-200 border-l-4 border-l-green-600 rounded-xl shadow-xs flex items-start gap-3">
          <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 1118 0z" />
          </svg>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-body-sm">Password Berhasil Diperbarui</span>
            <span className="text-slate-600 text-body-sm">Silakan masuk menggunakan password baru Anda.</span>
          </div>
        </div>
      ) : null}

      {registeredSuccess ? (
        <div className="mb-4 p-3.5 bg-white border border-green-200 border-l-4 border-l-green-600 rounded-xl shadow-xs flex items-start gap-3">
          <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 1118 0z" />
          </svg>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-body-sm">Pendaftaran Berhasil!</span>
            <span className="text-slate-600 text-body-sm">Akun kasir Anda sudah aktif. Silakan masuk.</span>
          </div>
        </div>
      ) : null}

      <AuthForm
        title="Masuk ke Lapak"
        subtitle="Kelola kasir & buku warung Anda sekarang."
        submitLabel="Masuk"
        loading={loading}
        onDone={handleSubmit}
      >
        {error ? (
          <div className="p-2.5 bg-error-container text-on-error-container rounded-lg text-body-sm">
            {error}
          </div>
        ) : null}

        <AuthField
          label="Email atau Nomor HP"
          name="emailOrPhone"
          type="text"
          autoComplete="username"
          placeholder="warung@email.com / 08xx"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          required
        />
        <AuthField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="flex items-center justify-between text-body-sm">
          <label className="flex items-center gap-2 text-on-surface-variant cursor-pointer text-body-sm">
            <input
              type="checkbox"
              className="rounded border-outline-variant text-primary focus:ring-primary"
            />
            <span>Ingat saya</span>
          </label>
          <Link
            href="/reset-password"
            className="text-primary font-label-ui hover:underline"
          >
            Lupa password?
          </Link>
        </div>
      </AuthForm>
    </div>
  );
}
