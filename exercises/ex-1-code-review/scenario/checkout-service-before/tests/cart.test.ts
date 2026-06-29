import assert from "node:assert/strict";
import { test } from "node:test";
import { priceCart, type Coupon, type Customer } from "../src/cart.ts";

const customer: Customer = {
  id: "cust_123",
  tier: "gold",
  region: "US",
  creditCents: 500,
};

const activeCoupon: Coupon = {
  code: "SUMMER20",
  percentOff: 20,
  maxDiscountCents: 1_000,
  expiresAt: "2030-01-01T00:00:00.000Z",
};

test("prices checkout with tier discount, capped coupon, credit, tax, and total", () => {
  const result = priceCart(
    customer,
    [{ sku: "seat", quantity: 2, unitPriceCents: 5_000, taxable: true }],
    activeCoupon,
    new Date("2026-06-01T00:00:00.000Z"),
  );

  assert.deepEqual(result, {
    subtotalCents: 10_000,
    discountCents: 1_500,
    creditCents: 500,
    taxCents: 660,
    totalCents: 8_660,
  });
});

test("ignores expired coupons", () => {
  const result = priceCart(
    { id: "cust_456", tier: "standard", region: "EU" },
    [{ sku: "license", quantity: 1, unitPriceCents: 10_000, taxable: true }],
    {
      code: "OLD50",
      percentOff: 50,
      maxDiscountCents: 5_000,
      expiresAt: "2020-01-01T00:00:00.000Z",
    },
    new Date("2026-06-01T00:00:00.000Z"),
  );

  assert.equal(result.discountCents, 0);
  assert.equal(result.taxCents, 2_000);
  assert.equal(result.totalCents, 12_000);
});

test("caps customer credit so totals cannot become negative", () => {
  const result = priceCart(
    { id: "cust_789", tier: "platinum", region: "IN", creditCents: 50_000 },
    [{ sku: "hardware", quantity: 1, unitPriceCents: 10_000, taxable: true }],
    undefined,
    new Date("2026-06-01T00:00:00.000Z"),
  );

  assert.deepEqual(result, {
    subtotalCents: 10_000,
    discountCents: 1_000,
    creditCents: 9_000,
    taxCents: 0,
    totalCents: 0,
  });
});

test("rejects empty carts and invalid item quantities", () => {
  assert.throws(
    () => priceCart(customer, [], activeCoupon, new Date("2026-06-01T00:00:00.000Z")),
    /at least one item/,
  );

  assert.throws(
    () =>
      priceCart(
        customer,
        [{ sku: "bad", quantity: 0, unitPriceCents: 100, taxable: true }],
        activeCoupon,
        new Date("2026-06-01T00:00:00.000Z"),
      ),
    /Invalid item bad/,
  );
});

