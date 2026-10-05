import type { Metadata } from "next";
import type { PricePlan, ReceiptData } from "@/features/landing/types";
import {
  PublicHeader,
  UtilityBar,
  HeroBadge,
  MetricStrip,
  NotaCard,
  BusinessTypeStrip,
  FeatureModules,
  StepsSection,
  PlanCard,
  FaqPanel,
  WaSupportCallout,
  LandingFooter,
  getLandingSettings,
} from "@/features/landing";

export const metadata: Metadata = {
  title: "Lapak — Sistem Kasir & Buku Warung",
};

/** Landing publik (tanpa login/AppShell). */
export default async function HomePage() {
  const { receipt, businessTypes, featureModules, steps, plans, faqs } =
    await getLandingSettings();

  return (
    <div className="bg-surface text-on-surface w-full">
      <PublicHeader />
      <main className="w-full pt-20 min-h-[calc(100vh-200px)]">
        <UtilityBar />
        <HeroSection receipt={receipt} />
        <BusinessTypeStrip items={businessTypes} />
        <section id="fitur" className="w-full py-space-xl px-space-md md:px-space-sm">
          <div className="max-w-[1240px] mx-auto flex flex-col gap-space-xl">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <span className="font-label-code text-label-code text-primary-container tracking-wider uppercase">
                Operasional Harian Praktis
              </span>
              <h2 className="font-headline-lg text-headline-lg md:text-[2.25rem] md:leading-[2.75rem] text-on-surface font-extrabold">
                Semua urusan warung selesai tanpa pusing
              </h2>
              <p className="text-body-md text-on-surface-variant">
                Tiga fungsi utama yang menggantikan buku tulis dan kalkulator manual.
              </p>
            </div>
            <FeatureModules modules={featureModules} />
          </div>
        </section>
        <section id="cara-kerja" className="w-full bg-surface-container-low py-space-xl px-space-md">
          <div className="max-w-[1240px] mx-auto flex flex-col gap-space-lg">
            <div className="text-center max-w-xl mx-auto">
              <span className="font-label-code text-label-code text-primary-container uppercase font-bold tracking-wider">
                Tanpa Ribet
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold mt-1">
                Hanya butuh 3 langkah untuk mulai jualan
              </h2>
            </div>
            <StepsSection steps={steps} />
          </div>
        </section>
        <section id="harga" className="w-full py-space-xl px-space-md">
          <div className="max-w-[1240px] mx-auto flex flex-col gap-space-xl">
            <div className="text-center max-w-2xl mx-auto flex flex-col gap-space-xs">
              <span className="font-label-code text-label-code text-primary-container tracking-wider uppercase font-bold">
                Biaya Langganan Jujur
              </span>
              <h2 className="font-headline-lg text-headline-lg md:text-[2.25rem] md:leading-[2.75rem] text-on-surface font-extrabold">
                Pilihan paket sederhana, tanpa biaya tersembunyi
              </h2>
              <p className="text-body-md text-on-surface-variant">
                Pilih paket yang paling pas untuk ukuran kios atau toko Anda saat ini. Bisa upgrade
                atau berhenti kapan saja.
              </p>
            </div>
            <PlanGrid plans={plans} />
            <div id="faq">
              <FaqPanel faqs={faqs} />
            </div>
          </div>
        </section>
        <WaSupportCallout />
        <LandingFooter />
      </main>
    </div>
  );
}

function HeroSection({ receipt }: { receipt: ReceiptData }) {
  return (
    <section className="w-full py-space-xl px-space-md overflow-hidden relative">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
        <div className="lg:col-span-7 flex flex-col gap-space-md z-10">
          <HeroBadge />
          <h1 className="font-headline-xl text-headline-xl md:text-[3.25rem] md:leading-[3.65rem] text-on-surface tracking-tight font-extrabold">
            Catat jualan, stok, dan untung dalam satu tempat
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
            Dibuat khusus untuk pedagang kios, warung, dan ruko di Indonesia. Cukup dari laptop atau
            komputer biasa di meja kasir tanpa perlu langganan rumit.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md pt-space-xs">
            <a
              href="#harga"
              className="inline-flex items-center justify-center bg-primary-container text-on-primary font-label-ui text-body-md font-semibold px-7 py-3.5 rounded-xl shadow-md hover:bg-primary active:translate-y-[1px] transition-all text-center"
            >
              Coba gratis
            </a>
            <a
              href="#fitur"
              className="inline-flex items-center justify-center bg-surface-container-lowest text-on-surface font-label-ui text-body-md font-semibold px-6 py-3.5 rounded-xl shadow-sm hover:bg-surface-container-low active:translate-y-[1px] transition-all text-center"
            >
              Lihat cara kerjanya
            </a>
          </div>
          <div className="flex items-center gap-space-xs text-body-sm text-on-surface-variant pt-space-xs">
            <span className="text-tertiary font-bold">✓</span>
            <span>Gratis 14 hari tanpa kartu kredit</span>
            <span className="text-outline-variant">•</span>
            <span>Tidak perlu instalasi rumit</span>
          </div>
          <MetricStrip />
        </div>
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <NotaCard receipt={receipt} />
        </div>
      </div>
    </section>
  );
}

function PlanGrid({ plans }: { plans: PricePlan[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg items-stretch">
      {plans.map((p) => (
        <PlanCard key={p.name} plan={p} />
      ))}
    </div>
  );
}