"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm, AuthField } from "./AuthForm";

export function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    storeName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { storeName, ownerName, email, phone, password, passwordConfirm } = formData;

    if (!storeName || !ownerName || !email || !phone || !password || !passwordConfirm) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Format email tidak valid.");
      return;
    }

    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push(`/otp?email=${encodeURIComponent(email)}&purpose=register`);
    }, 600);
  };

  return (
    <AuthForm
      title="Daftar Akun Baru"
      subtitle="Buka kios digital dan mulai catat transaksi warung."
      submitLabel="Daftar & Kirim OTP"
      loading={loading}
      onDone={handleSubmit}
    >
      {error ? (
        <div className="p-2.5 bg-error-container text-on-error-container rounded-lg text-body-sm">
          {error}
        </div>
      ) : null}

      <AuthField
        label="Nama Toko / Kios"
        name="storeName"
        type="text"
        autoComplete="organization"
        placeholder="Contoh: Warung Bu Sari"
        value={formData.storeName}
        onChange={handleChange}
        required
      />
      <AuthField
        label="Nama Pemilik"
        name="ownerName"
        type="text"
        autoComplete="name"
        placeholder="Contoh: Bu Sari"
        value={formData.ownerName}
        onChange={handleChange}
        required
      />
      <AuthField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="warung@email.com"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <AuthField
        label="Nomor WhatsApp / HP"
        name="phone"
        type="tel"
        autoComplete="tel"
        placeholder="081234567890"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <AuthField
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="Minimal 8 karakter"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <AuthField
        label="Konfirmasi Password"
        name="passwordConfirm"
        type="password"
        autoComplete="new-password"
        placeholder="Ulangi password"
        value={formData.passwordConfirm}
        onChange={handleChange}
        required
      />
    </AuthForm>
  );
}
