export type Customer = {
  id: string;
  tier: "standard" | "gold" | "platinum";
  region: "US" | "EU" | "IN";
  creditCents?: number;
};

export type CartItem = {
  sku: string;
  quantity: number;
  unitPriceCents: number;
  taxable: boolean;
};

export type Coupon = {
  code: string;
  percentOff: number;
  maxDiscountCents: number;
  expiresAt: string;
};

const TAX_RATES = {
  US: 0.0825,
  EU: 0.2,
  IN: 0.18,
} as const;

const TIER_DISCOUNTS = {
  standard: 0,
  gold: 0.05,
  platinum: 0.1,
} as const;

export function priceCart(
  customer: Customer,
  items: CartItem[],
  coupon?: Coupon,
  now: Date = new Date(),
) {
  if (items.length === 0) {
    throw new Error("Cart must include at least one item");
  }

  const subtotalCents = items.reduce((sum, item) => {
    if (item.quantity <= 0 || item.unitPriceCents < 0) {
      throw new Error(`Invalid item ${item.sku}`);
    }
    return sum + item.quantity * item.unitPriceCents;
  }, 0);

  const tierDiscountCents = Math.round(subtotalCents * TIER_DISCOUNTS[customer.tier]);
  const couponDiscountCents = calculateCouponDiscount(subtotalCents, coupon, now);
  const discountCents = Math.min(subtotalCents, tierDiscountCents + couponDiscountCents);
  const creditCents = Math.min(customer.creditCents ?? 0, subtotalCents - discountCents);
  const taxableBaseCents = Math.max(0, subtotalCents - discountCents - creditCents);
  const taxCents = Math.round(taxableBaseCents * TAX_RATES[customer.region]);
  const totalCents = taxableBaseCents + taxCents;

  return {
    subtotalCents,
    discountCents,
    creditCents,
    taxCents,
    totalCents,
  };
}

function calculateCouponDiscount(subtotalCents: number, coupon: Coupon | undefined, now: Date) {
  if (!coupon) {
    return 0;
  }

  if (new Date(coupon.expiresAt).getTime() <= now.getTime()) {
    return 0;
  }

  const boundedPercent = Math.max(0, Math.min(coupon.percentOff, 50));
  const requestedDiscount = Math.round(subtotalCents * (boundedPercent / 100));
  return Math.min(requestedDiscount, coupon.maxDiscountCents);
}

