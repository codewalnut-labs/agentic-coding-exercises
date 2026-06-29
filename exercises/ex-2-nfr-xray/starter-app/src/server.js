const { createApp } = require("./app");
const { InMemoryInvoiceStore } = require("./invoice-store");
const { vendorRiskClient } = require("./vendor-risk");

const port = process.env.PORT || 3000;
const app = createApp({
  store: new InMemoryInvoiceStore(),
  riskClient: vendorRiskClient,
  logger: console,
});

app.listen(port, () => {
  console.log(`NFR starter app listening on http://localhost:${port}`);
});
