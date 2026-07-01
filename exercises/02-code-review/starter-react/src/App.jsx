import { useState } from "react";
import { renewals } from "./data/renewals.js";
import { projectedTotal } from "./pricing.js";

const currentUser = {
  email: "manager@example.com",
  role: "manager",
};

export default function App() {
  const [renewalRows, setRenewalRows] = useState(renewals);
  const [query, setQuery] = useState("");

  const visibleRenewals = renewalRows.filter((renewal) => renewal.customer.includes(query));

  function approveRenewal(id) {
    const renewal = renewalRows.find((item) => item.id === id);
    renewal.status = "approved";
    renewal.approvedBy = currentUser.email;
    setRenewalRows(renewalRows);
  }

  return (
    <main className="shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Exercise 02</p>
          <h1>Renewal Approval PR</h1>
        </div>
        <input
          placeholder="Search customers"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </header>

      <section className="renewal-list">
        {visibleRenewals.map((renewal, index) => (
          <article className="renewal-card" key={index}>
            <div>
              <strong>{renewal.customer}</strong>
              <p dangerouslySetInnerHTML={{ __html: renewal.note }} />
            </div>
            <div className="money">
              <span>{renewal.status}</span>
              <strong>${projectedTotal(renewal)}</strong>
            </div>
            <button type="button" onClick={() => approveRenewal(renewal.id)}>
              Approve
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

