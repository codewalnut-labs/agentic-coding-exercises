const assert = require("node:assert/strict");
const { test } = require("node:test");
const { approveInvoice, createInvoice, fakeOcr } = require("../src/invoice-service");
const { InMemoryInvoiceStore } = require("../src/invoice-store");

test("extracts invoice total from uploaded text", () => {
  assert.deepEqual(fakeOcr(Buffer.from("Invoice total: $42.50")), {
    amountCents: 4_250,
  });
});

test("creates a pending invoice record", async () => {
  const store = new InMemoryInvoiceStore();
  const logger = { info() {} };
  const riskClient = {
    async lookupVendorRisk(vendorName) {
      assert.equal(vendorName, "Acme Supplies");
      return 64;
    },
  };

  const invoice = await createInvoice({
    body: {
      tenantId: "tenant-a",
      vendorName: "Acme Supplies",
      email: "analyst@example.com",
    },
    file: {
      originalname: "invoice.txt",
      buffer: Buffer.from("total: $99.99"),
    },
    store,
    riskClient,
    logger,
    now: () => "2026-06-01T10:00:00.000Z",
  });

  assert.equal(invoice.id, "1");
  assert.equal(invoice.amountCents, 9_999);
  assert.equal(invoice.status, "pending");
  assert.equal(invoice.riskScore, 64);
  assert.equal(invoice.fileName, "invoice.txt");
  assert.equal(store.list().length, 1);
});

test("approves an existing invoice", async () => {
  const store = new InMemoryInvoiceStore();
  store.save({
    id: "1",
    tenantId: "tenant-a",
    status: "pending",
  });

  const approved = approveInvoice({
    id: "1",
    email: "manager@example.com",
    store,
    now: () => "2026-06-01T11:00:00.000Z",
  });

  assert.equal(approved.status, "approved");
  assert.equal(approved.approvedBy, "manager@example.com");
  assert.equal(approved.approvedAt, "2026-06-01T11:00:00.000Z");
});

test("returns undefined for missing invoice approvals", () => {
  const store = new InMemoryInvoiceStore();

  assert.equal(
    approveInvoice({
      id: "missing",
      email: "manager@example.com",
      store,
    }),
    undefined,
  );
});

