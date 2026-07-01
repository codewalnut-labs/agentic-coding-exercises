import { useMemo, useState } from "react";
import { ApprovalDrawer } from "./components/ApprovalDrawer.jsx";
import { RenewalDashboard } from "./components/RenewalDashboard.jsx";
import { RenewalFilters } from "./components/RenewalFilters.jsx";
import { RenewalTable } from "./components/RenewalTable.jsx";
import { renewals } from "./data/renewals.js";
import { canApproveRenewal } from "./permissions.js";
import { projectedTotal, summarizePortfolio } from "./pricing.js";
import { recordApproval } from "./services/auditLog.js";

const currentUser = {
  email: "taylor.manager@example.com",
  role: "sales-manager",
  region: "US",
  approvalLimit: 250000,
  teams: ["enterprise", "strategic"],
};

export default function App() {
  const [renewalRows, setRenewalRows] = useState(renewals);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [segment, setSegment] = useState("all");
  const [selectedId, setSelectedId] = useState(renewals[0].id);

  const visibleRenewals = useMemo(() => {
    return renewalRows.filter((renewal) => {
      const matchesQuery = renewal.customer.includes(query) || renewal.ownerEmail.includes(query);
      const matchesStatus = status === "all" || renewal.status === status;
      const matchesSegment = segment === "all" || renewal.segment === segment;
      return matchesQuery && matchesStatus && matchesSegment;
    });
  }, [query, renewalRows, segment, status]);

  const selectedRenewal =
    renewalRows.find((renewal) => renewal.id === selectedId) ?? visibleRenewals[0] ?? renewalRows[0];

  const portfolio = useMemo(() => summarizePortfolio(visibleRenewals), [visibleRenewals]);

  function approveRenewal(id) {
    const renewal = renewalRows.find((item) => item.id === id);
    if (!canApproveRenewal(currentUser, renewal)) {
      return;
    }

    renewal.status = "approved";
    renewal.approvedBy = currentUser.email;
    renewal.approvedAt = new Date().toISOString();
    recordApproval(currentUser, renewal);
    setRenewalRows(renewalRows);
  }

  function requestException(id) {
    const renewal = renewalRows.find((item) => item.id === id);
    renewal.status = "exception-requested";
    renewal.exceptionRequestedBy = currentUser.email;
    setRenewalRows(renewalRows);
  }

  return (
    <main className="shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Exercise 02</p>
          <h1>Renewal Approval PR</h1>
          <p>Review this PR for regressions, anti-patterns, security issues, and missing checks.</p>
        </div>
      </header>

      <RenewalDashboard portfolio={portfolio} />

      <section className="workspace">
        <div className="main-column">
          <RenewalFilters
            query={query}
            segment={segment}
            status={status}
            onQueryChange={setQuery}
            onSegmentChange={setSegment}
            onStatusChange={setStatus}
          />

          <RenewalTable
            currentUser={currentUser}
            renewals={visibleRenewals}
            selectedId={selectedRenewal?.id}
            onApprove={approveRenewal}
            onRequestException={requestException}
            onSelect={setSelectedId}
            projectedTotal={projectedTotal}
          />
        </div>

        <ApprovalDrawer
          currentUser={currentUser}
          renewal={selectedRenewal}
          onApprove={approveRenewal}
          onRequestException={requestException}
          projectedTotal={projectedTotal}
        />
      </section>
    </main>
  );
}
