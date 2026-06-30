import { useState } from "react";
import { buildQuote } from "./quoteRules.js";

const defaultItems = [
  { sku: "software-seat", quantity: 5, unitPrice: 120, category: "software" },
  { sku: "implementation", quantity: 1, unitPrice: 900, category: "services" },
];

export default function App() {
  const [tier, setTier] = useState("growth");
  const [promoCode, setPromoCode] = useState("SAVE10");
  const quote = buildQuote({
    customerTier: tier,
    region: "US",
    promoCode,
    items: defaultItems,
  });

  return (
    <main className="app-shell">
      <header>
        <p className="eyebrow">Exercise 03</p>
        <h1>React Quote Prototype</h1>
      </header>

      <section className="controls">
        <label>
          Customer tier
          <select value={tier} onChange={(event) => setTier(event.target.value)}>
            <option value="starter">Starter</option>
            <option value="growth">Growth</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </label>

        <label>
          Promo code
          <select value={promoCode} onChange={(event) => setPromoCode(event.target.value)}>
            <option value="">None</option>
            <option value="SAVE10">SAVE10</option>
            <option value="SERVICES15">SERVICES15</option>
          </select>
        </label>
      </section>

      <section className="quote-card">
        <h2>Quote</h2>
        <Line label="Subtotal" value={quote.subtotal} />
        <Line label="Tier discount" value={-quote.tierDiscount} />
        <Line label="Promo discount" value={-quote.promoDiscount} />
        <Line label="Tax" value={quote.tax} />
        <Line label="Total" value={quote.total} strong />
      </section>
    </main>
  );
}

function Line({ label, value, strong }) {
  return (
    <div className={strong ? "line strong" : "line"}>
      <span>{label}</span>
      <span>${value.toFixed(2)}</span>
    </div>
  );
}

