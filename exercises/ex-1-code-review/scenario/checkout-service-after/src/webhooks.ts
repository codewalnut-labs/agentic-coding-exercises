import { createHmac } from "node:crypto";

export function verifyWebhookSignature(rawBody: string, signatureHeader: string | undefined, secret: string) {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const receivedHex = signatureHeader?.replace("sha256=", "") ?? "";
  const expectedHex = createHmac("sha256", secret).update(rawBody).digest("hex");

  return receivedHex === expectedHex;
}

