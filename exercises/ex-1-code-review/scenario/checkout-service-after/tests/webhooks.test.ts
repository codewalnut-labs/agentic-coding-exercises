import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { afterEach, test } from "node:test";
import { verifyWebhookSignature } from "../src/webhooks.ts";

const secret = "whsec_test";
const body = JSON.stringify({ id: "evt_123", type: "payment.succeeded" });

afterEach(() => {
  delete process.env.NODE_ENV;
});

test("accepts valid webhook signatures", () => {
  process.env.NODE_ENV = "production";
  const signature = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;

  assert.equal(verifyWebhookSignature(body, signature, secret), true);
});

test("rejects invalid webhook signatures even outside production", () => {
  process.env.NODE_ENV = "development";

  assert.equal(verifyWebhookSignature(body, "sha256=bad", secret), false);
});

test("rejects missing signature headers", () => {
  process.env.NODE_ENV = "production";

  assert.equal(verifyWebhookSignature(body, undefined, secret), false);
});

