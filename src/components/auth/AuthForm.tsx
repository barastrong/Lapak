"use client";

import { useState, useRef, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

export function AuthFooter({
  href,
  text,
  linkLabel,
}: {
  href: string;
  text: string;
  linkLabel: string;
}) {
  return (
    <p className="mt-space-md text-center text-body-sm text-on-surface-variant">
      {text}{" "}
      <Link
        href={href}
        className="text-primary font-label-ui font-semibold hover:underline"
      >
        {linkLabel}
      </Link>
    </p>
  );
}

export function AuthField({
  label,
  error,
  type = "text",
  className = "",
  ...props
}: {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className="font-label-ui text-label-ui text-on-surface">
        {label}
      </span>
      <div className="relative">
        <input
          type={inputType}
          className={`w-full bg-surface-container-low rounded-lg px-space-md py-2.5 text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all ${
            isPassword ? "pr-10" : ""
          } ${error ? "border border-error ring-1 ring-error/50" : ""} ${className}`}
          {...props}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
            aria-label={showPassword ? "Sembunyikan password" : "Lihat password"}
          >
            <Icon
              name={showPassword ? "visibility_off" : "visibility"}
              className="text-[20px]"
            />
          </button>
        ) : null}
      </div>
      {error ? (
        <span className="text-body-sm text-error font-medium">{error}</span>
      ) : null}
    </label>
  );
}

export function OtpBoxes({
  value,
  onChange,
  disabled = false,
}: {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, char: string) => {
    if (disabled) return;
    const clean = char.replace(/\D/g, "");
    if (!clean) {
      const nextArr = value.split("");
      nextArr[index] = "";
      onChange(nextArr.join(""));
      return;
    }
    const valArr = value.padEnd(6, " ").split("");
    if (clean.length > 1) {
      const pasted = clean.slice(0, 6);
      onChange(pasted);
      const nextFocus = Math.min(pasted.length, 5);
      inputsRef.current[nextFocus]?.focus();
      return;
    }
    valArr[index] = clean[0];
    const nextVal = valArr.join("").trimEnd();
    onChange(nextVal);
    if (index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 my-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          disabled={disabled}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={(e) => {
            e.preventDefault();
            const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
            if (pasted) {
              onChange(pasted);
              const nextFocus = Math.min(pasted.length, 5);
              inputsRef.current[nextFocus]?.focus();
            }
          }}
          className="w-12 h-13 text-center text-headline-md font-label-numeric font-bold bg-surface-container-low text-on-surface rounded-xl border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none transition-all disabled:opacity-50"
          autoFocus={i === 0}
        />
      ))}
    </div>
  );
}

export function AuthForm({
  title,
  subtitle,
  onDone,
  children,
  submitLabel,
  loading = false,
}: {
  title: string;
  subtitle?: string;
  onDone?: (e: React.FormEvent) => void;
  children: ReactNode;
  submitLabel: string;
  loading?: boolean;
}) {
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (loading) return;
        if (onDone) onDone(e);
        else router.push("/dashboard");
      }}
    >
      <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
        {title}
      </h1>
      {subtitle ? (
        <p className="text-body-sm text-on-surface-variant mt-1">{subtitle}</p>
      ) : null}
      <div className="flex flex-col gap-space-sm mt-space-md">{children}</div>
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-space-lg bg-primary text-on-primary rounded-xl font-label-ui text-label-ui py-3 hover:bg-primary-container transition-all active:translate-y-[1px] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
        ) : null}
        <span>{submitLabel}</span>
      </button>
    </form>
  );
}
