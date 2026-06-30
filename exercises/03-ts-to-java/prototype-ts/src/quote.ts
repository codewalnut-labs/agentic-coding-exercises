export type CustomerTier = "starter" | "growth" | "enterprise";
export type Region = "US" | "EU" | "IN";
export type Category = "software" | "services" | "hardware";
export type PromoCode = "SAVE10" | "SERVICES15";

export type QuoteItem = {
  sku: string;
  quantity: number;
  unitPrice: number;
  category: Category;
};

export type QuoteRequest = {
  customerTier: CustomerTier;
  region: Region;
  promoCode?: PromoCode;
  items: QuoteItem[];
};

export type QuoteResponse = {
  subtotal: number;
  tierDiscount: number;
  promoDiscount: number;
  tax: number;
  total: number;
};

const TIER_DISCOUNTS: Record<CustomerTier, number> = {
  starter: 0,
  growth: 0.07,
  enterprise: 0.12,
};

const TAX_RATES: Record<Region, number> = {
  US: 0.0825,
  EU: 0.2,
  IN: 0.18,
};

export function buildQuote(request: QuoteRequest): QuoteResponse {
  if (!request.items.length) {
    throw new Error("items are required");
  }

  const subtotal = request.items.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice;
  }, 0);

  const tierDiscount = roundMoney(subtotal * TIER_DISCOUNTS[request.customerTier]);
  const promoDiscount = calculatePromoDiscount(request, subtotal);
  const taxableAmount = Math.max(0, subtotal - tierDiscount - promoDiscount);
  const tax = roundMoney(taxableAmount * TAX_RATES[request.region]);

  return {
    subtotal: roundMoney(subtotal),
    tierDiscount,
    promoDiscount,
    tax,
    total: roundMoney(taxableAmount + tax),
  };
}

function calculatePromoDiscount(request: QuoteRequest, subtotal: number): number {
  if (request.promoCode === "SAVE10") {
    return Math.min(roundMoney(subtotal * 0.1), 200);
  }

  if (request.promoCode === "SERVICES15") {
    const servicesSubtotal = request.items
      .filter((item) => item.category === "services")
      .reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    return Math.min(roundMoney(servicesSubtotal * 0.15), 300);
  }

  return 0;
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

