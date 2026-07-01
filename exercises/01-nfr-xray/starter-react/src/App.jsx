import { useMemo, useState } from "react";
import { enterpriseRequests } from "./data/requests.js";
import { loadDraft, saveDraft } from "./services/draftStore.js";

export default function App() {
  const [tenant, setTenant] = useState("acme-bank");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState(loadDraft());
  const [requests, setRequests] = useState(enterpriseRequests);

  const visibleRequests = useMemo(() => {
    return requests
      .filter((request) => request.tenantId === tenant)
      .filter((request) => request.vendor.includes(query) || request.ownerEmail.includes(query));
  }, [query, requests, tenant]);

  function approveRequest(id) {
    const nextRequests = requests.map((request) => {
      if (request.id !== id) {
        return request;
      }

      return {
        ...request,
        status: "approved",
        approvedBy: draft.ownerEmail,
        approvedAt: new Date().toISOString(),
      };
    });

    console.log("approval event", nextRequests.find((request) => request.id === id));
    setRequests(nextRequests);
  }

  function updateDraft(field, value) {
    const nextDraft = { ...draft, [field]: value };
    setDraft(nextDraft);
    saveDraft(nextDraft);
  }

  return (
    <main className="shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Exercise 01</p>
          <h1>Vendor Risk Intake</h1>
        </div>
        <select value={tenant} onChange={(event) => setTenant(event.target.value)}>
          <option value="acme-bank">Acme Bank</option>
          <option value="northwind-health">Northwind Health</option>
          <option value="globex-retail">Globex Retail</option>
        </select>
      </header>

      <section className="grid">
        <form className="panel">
          <h2>New request</h2>
          <input
            placeholder="Vendor legal name"
            value={draft.vendor}
            onChange={(event) => updateDraft("vendor", event.target.value)}
          />
          <input
            placeholder="Owner email"
            value={draft.ownerEmail}
            onChange={(event) => updateDraft("ownerEmail", event.target.value)}
          />
          <textarea
            placeholder="Business justification"
            value={draft.justification}
            onChange={(event) => updateDraft("justification", event.target.value)}
          />
          <button type="button">Submit risk review</button>
        </form>

        <section className="panel">
          <div className="queue-header">
            <h2>Review queue</h2>
            <input
              placeholder="Search queue"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className="request-list">
            {visibleRequests.map((request, index) => (
              <article className="request-card" key={index}>
                <div>
                  <strong>{request.vendor}</strong>
                  <p>{request.ownerEmail}</p>
                  <p dangerouslySetInnerHTML={{ __html: request.riskSummaryHtml }} />
                </div>
                <div className="request-actions">
                  <span className={request.status}>{request.status}</span>
                  <button type="button" onClick={() => approveRequest(request.id)}>
                    Approve
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

