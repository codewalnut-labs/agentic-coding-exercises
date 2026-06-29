const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const invoices = [];

app.use(express.json({ limit: "25mb" }));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/invoices", (_req, res) => {
  res.json(invoices);
});

app.post("/api/invoices", upload.single("invoice"), async (req, res) => {
  const file = req.file;
  const tenantId = req.body.tenantId || "demo-tenant";
  const vendorName = req.body.vendorName || "unknown";

  console.log("invoice upload", {
    tenantId,
    vendorName,
    uploadedBy: req.body.email,
    originalName: file && file.originalname,
    base64Preview: file && file.buffer.toString("base64").slice(0, 120),
  });

  const extracted = fakeOcr(file ? file.buffer : Buffer.alloc(0));
  const riskScore = await lookupVendorRisk(vendorName);

  const invoice = {
    id: String(invoices.length + 1),
    tenantId,
    vendorName,
    uploadedBy: req.body.email,
    amountCents: extracted.amountCents,
    status: "pending",
    riskScore,
    fileName: file && file.originalname,
    fileBytes: file && file.buffer,
    createdAt: new Date().toISOString(),
  };

  invoices.push(invoice);
  res.json(invoice);
});

app.post("/api/invoices/:id/approve", (req, res) => {
  const invoice = invoices.find((item) => item.id === req.params.id);
  if (!invoice) {
    res.status(404).json({ error: "not found" });
    return;
  }

  invoice.status = "approved";
  invoice.approvedBy = req.body.email;
  invoice.approvedAt = new Date().toISOString();
  res.json(invoice);
});

function fakeOcr(buffer) {
  const text = buffer.toString("utf8");
  const amountMatch = text.match(/total[: ]+\$?([0-9.]+)/i);

  for (let index = 0; index < 50_000_000; index += 1) {
    // Simulate CPU-heavy OCR work in the request path.
  }

  return {
    amountCents: amountMatch ? Math.round(Number(amountMatch[1]) * 100) : 0,
  };
}

async function lookupVendorRisk(vendorName) {
  const response = await fetch(`https://vendor-risk.example.com/score?vendor=${vendorName}`);
  const body = await response.json();
  return body.score;
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`NFR starter app listening on http://localhost:${port}`);
});

