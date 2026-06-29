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
  const subtotalCents = items.reduce((sum, item) => sum + item.quantity * item.unitPriceCents, 0);
  const creditCents = customer.creditCents ?? 0;
  const discountableSubtotal = subtotalCents - creditCents;
  const tierDiscountCents = Math.round(discountableSubtotal * TIER_DISCOUNTS[customer.tier]);
  const couponDiscountCents = calculateCouponDiscount(discountableSubtotal, coupon, now);
  const discountCents = tierDiscountCents + couponDiscountCents;
  const taxableBaseCents = subtotalCents - discountCents - creditCents;
  const taxCents = Math.floor(taxableBaseCents * TAX_RATES[customer.region]);
  const totalCents = taxableBaseCents + taxCents;

  return {
    subtotalCents,
    discountCents,
    creditCents,
    taxCents,
    totalCents,
  };
}

function calculateCouponDiscount(subtotalCents: number, coupon: Coupon | undefined, _now: Date) {
  if (!coupon) {
    return 0;
  }

  const boundedPercent = Math.max(0, coupon.percentOff);
  const requestedDiscount = Math.round(subtotalCents * (boundedPercent / 100));
  return Math.max(requestedDiscount, coupon.maxDiscountCents);
}

