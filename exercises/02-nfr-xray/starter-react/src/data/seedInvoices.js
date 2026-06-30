export const seedInvoices = [
  {
    id: "inv-1001",
    tenant: "demo-tenant",
    vendor: "Acme Supplies",
    ownerEmail: "analyst@example.com",
    amount: 4890,
    status: "pending",
    uploadedAt: "2026-06-01T10:00:00.000Z",
    fileName: "acme-invoice.pdf",
  },
  {
    id: "inv-1002",
    tenant: "demo-tenant",
    vendor: "Northstar Logistics",
    ownerEmail: "finance@example.com",
    amount: 12650,
    status: "approved",
    uploadedAt: "2026-06-02T11:30:00.000Z",
    approvedAt: "2026-06-02T12:15:00.000Z",
    fileName: "northstar-invoice.pdf",
  },
];

