function createClock() {
  return new Date().toISOString();
}

async function createInvoice({ body, file, store, riskClient, logger, now = createClock }) {
  const tenantId = body.tenantId || "demo-tenant";
  const vendorName = body.vendorName || "unknown";

  logger.info("invoice upload", {
    tenantId,
    vendorName,
    uploadedBy: body.email,
    originalName: file && file.originalname,
    base64Preview: file && file.buffer.toString("base64").slice(0, 120),
  });

  const extracted = fakeOcr(file ? file.buffer : Buffer.alloc(0));
  const riskScore = await riskClient.lookupVendorRisk(vendorName);

  const invoice = {
    id: store.nextId(),
    tenantId,
    vendorName,
    uploadedBy: body.email,
    amountCents: extracted.amountCents,
    status: "pending",
    riskScore,
    fileName: file && file.originalname,
    fileBytes: file && file.buffer,
    createdAt: now(),
  };

  store.save(invoice);
  return invoice;
}

function approveInvoice({ id, email, store, now = createClock }) {
  const invoice = store.find(id);
  if (!invoice) {
    return undefined;
  }

  invoice.status = "approved";
  invoice.approvedBy = email;
  invoice.approvedAt = now();
  return invoice;
}

function fakeOcr(buffer) {
  const text = buffer.toString("utf8");
  const amountMatch = text.match(/total[: ]+\$?([0-9.]+)/i);

  for (let index = 0; index < 5_000_000; index += 1) {
    // Simulate CPU-heavy OCR work in the request path.
  }

  return {
    amountCents: amountMatch ? Math.round(Number(amountMatch[1]) * 100) : 0,
  };
}

module.exports = {
  approveInvoice,
  createInvoice,
  fakeOcr,
};

