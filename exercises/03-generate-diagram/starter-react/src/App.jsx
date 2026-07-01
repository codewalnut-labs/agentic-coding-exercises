import { useMemo, useState } from "react";
import { accessRequests } from "./data/accessRequests.js";
import { nextStepFor } from "./workflow.js";

export default function App() {
  const [requests, setRequests] = useState(accessRequests);
  const [selectedId, setSelectedId] = useState(accessRequests[0].id);
  const selected = requests.find((request) => request.id === selectedId);

  const timeline = useMemo(() => {
    return selected.history.map((event) => `${event.actor}: ${event.action}`);
  }, [selected]);

  function advanceWorkflow() {
    const nextRequests = requests.map((request) => {
      if (request.id !== selected.id) {
        return request;
      }

      const nextStep = nextStepFor(request);
      return {
        ...request,
        status: nextStep.status,
        history: [...request.history, nextStep.event],
      };
    });

    setRequests(nextRequests);
  }

  return (
    <main className="shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Exercise 03</p>
          <h1>Access Request Workflow</h1>
        </div>
        <button type="button" onClick={advanceWorkflow}>
          Advance workflow
        </button>
      </header>

      <section className="layout">
        <aside className="panel request-list">
          {requests.map((request) => (
            <button
              type="button"
              key={request.id}
              className={request.id === selected.id ? "request active" : "request"}
              onClick={() => setSelectedId(request.id)}
            >
              <strong>{request.employee}</strong>
              <span>{request.status}</span>
            </button>
          ))}
        </aside>

        <section className="panel">
          <h2>{selected.systemName}</h2>
          <dl className="metadata">
            <div>
              <dt>Employee</dt>
              <dd>{selected.employee}</dd>
            </div>
            <div>
              <dt>Manager</dt>
              <dd>{selected.manager}</dd>
            </div>
            <div>
              <dt>Risk</dt>
              <dd>{selected.risk}</dd>
            </div>
          </dl>

          <h3>Timeline</h3>
          <ol>
            {timeline.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>
      </section>
    </main>
  );
}

