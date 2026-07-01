import { useMemo, useState } from "react";
import { IntegrationPanel } from "./components/IntegrationPanel.jsx";
import { RequestBoard } from "./components/RequestBoard.jsx";
import { RequestSummary } from "./components/RequestSummary.jsx";
import { Timeline } from "./components/Timeline.jsx";
import { WorkflowMap } from "./components/WorkflowMap.jsx";
import { accessRequests } from "./data/accessRequests.js";
import { applyWorkflowStep, buildActorList, buildFlowSteps, nextStepFor } from "./workflow.js";

export default function App() {
  const [requests, setRequests] = useState(accessRequests);
  const [selectedId, setSelectedId] = useState(accessRequests[0].id);
  const selected = requests.find((request) => request.id === selectedId);

  const actors = useMemo(() => buildActorList(selected), [selected]);
  const flowSteps = useMemo(() => buildFlowSteps(selected), [selected]);

  function advanceWorkflow() {
    const nextRequests = requests.map((request) => {
      if (request.id !== selected.id) {
        return request;
      }

      const nextStep = nextStepFor(request);
      return applyWorkflowStep(request, nextStep);
    });

    setRequests(nextRequests);
  }

  function markProvisioningHealthy() {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === selected.id
          ? {
              ...request,
              provisioningHealthy: true,
              integrations: request.integrations.map((integration) =>
                integration.name === "Identity Provider"
                  ? { ...integration, status: "healthy", lastRun: "Manual retry queued" }
                  : integration,
              ),
            }
          : request,
      ),
    );
  }

  return (
    <main className="shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Exercise 03</p>
          <h1>Access Request Workflow</h1>
          <p>Use this feature to generate a sequence diagram and a flow diagram.</p>
        </div>
        <div className="header-actions">
          <button type="button" onClick={advanceWorkflow}>
            Advance workflow
          </button>
          <button className="secondary-button" type="button" onClick={markProvisioningHealthy}>
            Retry provisioning
          </button>
        </div>
      </header>

      <section className="layout">
        <RequestBoard requests={requests} selectedId={selected.id} onSelect={setSelectedId} />

        <section className="main-column">
          <RequestSummary request={selected} actors={actors} />
          <WorkflowMap request={selected} steps={flowSteps} />
          <IntegrationPanel request={selected} />
          <Timeline events={selected.history} />
        </section>
      </section>
    </main>
  );
}
