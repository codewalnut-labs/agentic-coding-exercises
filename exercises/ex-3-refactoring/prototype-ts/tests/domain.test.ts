import assert from "node:assert/strict";
import { test } from "node:test";
import { buildQuote, type QuoteRequest } from "../src/domain.ts";

const baseRequest: QuoteRequest = {
  customerId: "cust_123",
  customerTier: "growth",
  region: "US",
  promoCode: "SAVE10",
  requestedAt: "2026-06-01T10:00:00.000Z",
  items: [
    { sku: "platform", quantity: 2, unitPriceCents: 50_000, category: "software" },
    { sku: "onboarding", quantity: 1, unitPriceCents: 80_000, category: "services" },
  ],
};

test("builds a deterministic quote with tier, promo, tax, shipping, and expiry", () => {
  const quote = buildQuote(baseRequest);

  assert.deepEqual(quote, {
    quoteId: "quote_05a2e40a7fad",
    currency: "USD",
    subtotalCents: 180_000,
    tierDiscountCents: 12_600,
    promoDiscountCents: 18_000,
    taxCents: 12_326,
    shippingCents: 2_500,
    totalCents: 164_226,
    expiresAt: "2026-06-01T10:15:00.000Z",
  });
});

test("caps services promo and waives shipping for large quotes", () => {
  const quote = buildQuote({
    ...baseRequest,
    customerTier: "enterprise",
    promoCode: "SERVICES15",
    items: [
      { sku: "implementation", quantity: 3, unitPriceCents: 100_000, category: "services" },
      { sku: "appliance", quantity: 1, unitPriceCents: 50_000, category: "hardware" },
    ],
  });

  assert.equal(quote.subtotalCents, 350_000);
  assert.equal(quote.tierDiscountCents, 42_000);
  assert.equal(quote.promoDiscountCents, 30_000);
  assert.equal(quote.shippingCents, 0);
  assert.equal(quote.totalCents, 300_935);
});

test("rejects invalid items", () => {
  assert.throws(
    () =>
      buildQuote({
        ...baseRequest,
        items: [{ sku: "bad", quantity: 0, unitPriceCents: 100, category: "software" }],
      }),
    /invalid quantity/,
  );
});
