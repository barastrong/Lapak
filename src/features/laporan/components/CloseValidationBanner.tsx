import { Icon } from "@/components/ui/Icon";
import type { CloseValidation } from "@/features/laporan/types";

/** Kaki laporan: validasi tutup kasir terakhir + riwayat rekonsiliasi. */
export function CloseValidationBanner({ validation }: { validation: CloseValidation }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-space-md rounded-xl bg-surface-container-lowest shadow-sm gap-space-sm">
      <div className="flex items-center gap-space-sm">
        <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
          <Icon name="verified_user" className="text-xl" />
        </div>
        <div className="flex flex-col">
          <span className="font-headline-sm text-headline-sm text-on-surface">
            Validasi Tutup Kasir Terakhir
          </span>
          <span className="text-body-sm text-on-surface-variant">
            {validation.shift} ditutup sesuai fisik uang brankas oleh{" "}
            <strong>{validation.name}</strong> pada {validation.datetime}. Selisih{" "}
            <strong>{validation.diff === 0 ? "Rp 0 (Sesuai)" : "ada selisih"}</strong>.
          </span>
        </div>
      </div>
      <button
        type="button"
        className="shrink-0 px-space-md py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-ui text-label-ui transition-colors"
      >
        Riwayat Rekonsiliasi Kas
      </button>
    </div>
  );
}