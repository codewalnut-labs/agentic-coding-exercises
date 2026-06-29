import { createHash } from "node:crypto";

export type CustomerTier = "starter" | "growth" | "enterprise";
export type Region = "US" | "EU" | "IN";
export type Category = "software" | "services" | "hardware";
export type PromoCode = "SAVE10" | "SERVICES15" | "SHIPFREE";

export type QuoteItem = {
  sku: string;
  quantity: number;
  unitPriceCents: number;
  category: Category;
};

export type QuoteRequest = {
  customerId: string;
  customerTier: CustomerTier;
  region: Region;
  promoCode?: PromoCode;
  requestedAt: string;
  items: QuoteItem[];
};

export type QuoteResponse = {
  quoteId: string;
  currency: "USD";
  subtotalCents: number;
  tierDiscountCents: number;
  promoDiscountCents: number;
  taxCents: number;
  shippingCents: number;
  totalCents: number;
  expiresAt: string;
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
  validateRequest(request);

  const subtotalCents = request.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPriceCents,
    0,
  );
  const tierDiscountCents = Math.round(subtotalCents * TIER_DISCOUNTS[request.customerTier]);
  const promoDiscountCents = calculatePromoDiscount(request, subtotalCents);
  const netBeforeTaxCents = Math.max(0, subtotalCents - tierDiscountCents - promoDiscountCents);
  const taxCents = Math.round(netBeforeTaxCents * TAX_RATES[request.region]);
  const shippingCents = request.promoCode === "SHIPFREE" || subtotalCents >= 250_000 ? 0 : 2_500;
  const totalCents = netBeforeTaxCents + taxCents + shippingCents;

  const requestedAt = new Date(request.requestedAt);
  const expiresAt = new Date(requestedAt.getTime() + 15 * 60 * 1000).toISOString();

  return {
    quoteId: quoteIdFor(request),
    currency: "USD",
    subtotalCents,
    tierDiscountCents,
    promoDiscountCents,
    taxCents,
    shippingCents,
    totalCents,
    expiresAt,
  };
}

function calculatePromoDiscount(request: QuoteRequest, subtotalCents: number): number {
  if (!request.promoCode) {
    return 0;
  }

  if (request.promoCode === "SAVE10") {
    return Math.min(Math.round(subtotalCents * 0.1), 20_000);
  }

  if (request.promoCode === "SERVICES15") {
    const servicesSubtotal = request.items
      .filter((item) => item.category === "services")
      .reduce((sum, item) => sum + item.quantity * item.unitPriceCents, 0);
    return Math.min(Math.round(servicesSubtotal * 0.15), 30_000);
  }

  return 0;
}

function validateRequest(request: QuoteRequest): void {
  if (!request.customerId.trim()) {
    throw new Error("customerId is required");
  }

  if (Number.isNaN(new Date(request.requestedAt).getTime())) {
    throw new Error("requestedAt must be a valid date-time");
  }

  if (!request.items.length) {
    throw new Error("At least one item is required");
  }

  for (const item of request.items) {
    if (!item.sku.trim()) {
      throw new Error("item sku is required");
    }

    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      throw new Error(`item ${item.sku} has invalid quantity`);
    }

    if (!Number.isInteger(item.unitPriceCents) || item.unitPriceCents < 0) {
      throw new Error(`item ${item.sku} has invalid price`);
    }
  }
}

function quoteIdFor(request: QuoteRequest): string {
  const normalized = {
    customerId: request.customerId,
    customerTier: request.customerTier,
    region: request.region,
    promoCode: request.promoCode ?? null,
    requestedAt: request.requestedAt,
    items: request.items,
  };

  return `quote_${createHash("sha256").update(JSON.stringify(normalized)).digest("hex").slice(0, 12)}`;
}

