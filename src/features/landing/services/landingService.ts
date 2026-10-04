import {
  receiptMock,
  businessTypesMock,
  featureModulesMock,
  stepsMock,
  pricePlansMock,
  faqsMock,
} from "@/features/landing/data/landing.mock";
import type { BusinessType, FeatureModule, PricePlan, ReceiptData, Step } from "@/features/landing/types";

export type LandingSettings = {
  receipt: ReceiptData;
  businessTypes: BusinessType[];
  featureModules: Pick<FeatureModule, "badge" | "badgeClassName" | "title" | "desc">[];
  steps: Step[];
  plans: PricePlan[];
  faqs: { question: string; answer: string }[];
};

/** Ambil semua data landing page. // TODO: hook ke API */
export function getLandingSettings(): Promise<LandingSettings> {
  return Promise.resolve({
    receipt: receiptMock,
    businessTypes: businessTypesMock,
    featureModules: featureModulesMock,
    steps: stepsMock,
    plans: pricePlansMock,
    faqs: faqsMock,
  });
}