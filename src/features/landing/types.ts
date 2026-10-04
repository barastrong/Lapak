export type ReceiptItem = {
  name: string;
  detail: string;
  total: number;
  promo?: string;
};

export type ReceiptData = {
  title: string;
  storeName: string;
  address: string;
  number: string;
  datetime: string;
  cashier: string;
  payment: string;
  items: ReceiptItem[];
  subtotal: number;
  discounts: { label: string; amount: number }[];
  total: number;
  change: number;
};

export type BusinessType = {
  name: string;
  desc: string;
  dotClassName: string;
};

export type FeatureModule = {
  badge: string;
  badgeClassName: string;
  title: string;
  desc: string;
  mockup: React.ReactNode;
};

export type Step = {
  number: string;
  title: string;
  desc: string;
  highlighted?: boolean;
};

export type PricePlan = {
  packageTag: string;
  tagClassName: string;
  name: string;
  desc: string;
  price: string;
  priceNote: string;
  priceClassName?: string;
  features: { text: string; semibold?: boolean }[];
  cta: string;
  ctaHref: string;
  ctaOuter?: boolean;
  ctaClassName: string;
  popular?: boolean;
  tag?: string;
};

export type Faq = {
  question: string;
  answer: string;
};