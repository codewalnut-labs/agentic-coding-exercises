import assert from "node:assert/strict";
import { test } from "node:test";
import { buildQuote, type QuoteRequest } from "../src/quote.ts";

const baseRequest: QuoteRequest = {
  customerTier: "growth",
  region: "US",
  promoCode: "SAVE10",
  items: [
    { sku: "software-seat", quantity: 5, unitPrice: 120, category: "software" },
    { sku: "implementation", quantity: 1, unitPrice: 900, category: "services" },
  ],
};

test("builds a quote with tier discount, promo discount, tax, and total", () => {
  assert.deepEqual(buildQuote(baseRequest), {
    subtotal: 1500,
    tierDiscount: 105,
    promoDiscount: 150,
    tax: 102.71,
    total: 1347.71,
  });
});

test("caps services promo at 300", () => {
  const quote = buildQuote({
    customerTier: "enterprise",
    region: "EU",
    promoCode: "SERVICES15",
    items: [
      { sku: "implementation", quantity: 3, unitPrice: 1000, category: "services" },
      { sku: "appliance", quantity: 1, unitPrice: 500, category: "hardware" },
    ],
  });

  assert.equal(quote.subtotal, 3500);
  assert.equal(quote.tierDiscount, 420);
  assert.equal(quote.promoDiscount, 300);
  assert.equal(quote.tax, 556);
  assert.equal(quote.total, 3336);
});

test("rejects empty item lists", () => {
  assert.throws(
    () =>
      buildQuote({
        customerTier: "starter",
        region: "IN",
        items: [],
      }),
    /items are required/,
  );
});

