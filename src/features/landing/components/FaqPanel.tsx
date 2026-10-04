import { Icon } from "@/components/ui/Icon";
import type { Faq } from "@/features/landing/types";

/** Panel FAQ ringkas (tanya-jawab layanan). */
export function FaqPanel({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="bg-surface-container-low p-space-lg rounded-2xl max-w-3xl mx-auto w-full flex flex-col gap-space-md">
      <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold text-center">
        Pertanyaan Umum Seputar Kasir Lapak
      </h4>
      <div className="flex flex-col gap-space-sm">
        {faqs.map((f) => (
          <div key={f.question} className="bg-surface-container-lowest p-space-md rounded-xl">
            <p className="font-label-ui text-label-ui font-bold text-on-surface">{f.question}</p>
            <p className="text-body-sm text-on-surface-variant mt-1">{f.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Callout dukungan WhatsApp di bawah pricing. */
export function WaSupportCallout() {
  return (
    <section className="w-full bg-surface-container-highest py-space-xl px-space-md">
      <div className="max-w-[1240px] mx-auto bg-surface-container-lowest rounded-2xl p-space-lg shadow-lg flex flex-col md:flex-row items-center justify-between gap-space-lg">
        <div className="flex flex-col gap-space-xs max-w-xl">
          <div className="flex items-center gap-space-xs">
            <span className="w-3 h-3 rounded-full bg-tertiary-container"></span>
            <span className="font-label-ui text-label-ui text-tertiary-container font-bold uppercase tracking-wider">
              Layanan Panduan Langsung
            </span>
          </div>
          <h3 className="font-headline-lg text-headline-lg text-on-surface font-extrabold">
            Ada pertanyaan atau butuh panduan setting kasir kios Anda?
          </h3>
          <p className="text-body-md text-on-surface-variant">
            Hubungi kami langsung di WhatsApp:{" "}
            <strong className="text-on-surface font-label-code">+62 812-8900-LAPAK (0812-8900-52725)</strong>.
            Tim kami siap bantu setiap hari 08:00 - 20:00 WIB.
          </p>
        </div>
        <div className="shrink-0 w-full md:w-auto">
          <a
            href="https://wa.me/62812890052725"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-space-xs bg-tertiary-container text-on-primary font-label-ui text-body-md font-bold px-7 py-4 rounded-xl shadow-md hover:bg-tertiary active:translate-y-[1px] transition-all w-full md:w-auto"
          >
            <Icon name="chat" className="text-[24px]" />
            <span>Chat via WhatsApp Sekarang</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/** Footer ringkas (brand + hak cipta) — dipakai di landing page publik. */
export function LandingFooter() {
  return (
    <footer className="w-full bg-surface-container-low py-space-xl shadow-[0_-1px_6px_rgba(0,0,0,0.02)]">
      <div className="max-w-[1240px] mx-auto px-space-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg pb-space-lg border-b border-surface-container-highest">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-md text-headline-md text-on-surface">Lapak</span>
              <span className="font-label-code text-label-code bg-surface-container px-space-xs py-0.5 rounded text-on-surface-variant">
                UMKM Kasir & Nota
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant max-w-md">
              Aplikasi kasir praktis dan pencatatan buku warung harian digital untuk memajukan usaha
              mikro, kecil, dan menengah di seluruh pelosok Indonesia.
            </p>
          </div>
        </div>
        <div className="pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm text-body-sm text-on-surface-variant">
          <p>© 2025 Lapak Indonesia. Hak cipta dilindungi undang-undang.</p>
        </div>
      </div>
    </footer>
  );
}