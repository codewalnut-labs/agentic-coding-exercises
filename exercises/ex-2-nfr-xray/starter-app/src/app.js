const express = require("express");
const multer = require("multer");
const path = require("path");
const { approveInvoice, createInvoice } = require("./invoice-service");

function createApp({ store, riskClient, logger }) {
  const app = express();
  const upload = multer({ storage: multer.memoryStorage() });

  app.use(express.json({ limit: "25mb" }));
  app.use(express.static(path.join(__dirname, "../public")));

  app.get("/api/invoices", (_req, res) => {
    res.json(store.list());
  });

  app.post("/api/invoices", upload.single("invoice"), async (req, res) => {
    try {
      const invoice = await createInvoice({
        body: req.body,
        file: req.file,
        store,
        riskClient,
        logger,
      });
      res.json(invoice);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "upload failed",
      });
    }
  });

  app.post("/api/invoices/:id/approve", (req, res) => {
    const invoice = approveInvoice({
      id: req.params.id,
      email: req.body.email,
      store,
    });

    if (!invoice) {
      res.status(404).json({ error: "not found" });
      return;
    }

    res.json(invoice);
  });

  return app;
}

module.exports = { createApp };

