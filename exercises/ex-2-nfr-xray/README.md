# Exercise 02: NFR X-Ray

## Goal

X-ray a feature for enterprise-grade non-functional requirements. Your review should cover security, privacy, performance, scalability, resilience, observability, operability, accessibility, and data integrity.

## Scenario

A product team built the first version of an invoice upload and approval feature for an enterprise finance portal. The feature is close to a demo, but leadership wants to know whether it can survive a production launch for regulated customers.

Start with:

- [Feature brief](./scenario/feature-brief.md)
- [NFR checklist](./scenario/nfr-checklist.md)
- [Starter app](./starter-app)

## What To Produce

Create a report such as:

```text
submissions/<github-handle>/ex-2/nfr-xray.md
```

Your report should include:

- Executive summary.
- Top risks ranked by severity.
- Evidence from the code, UI, or architecture.
- Recommended remediation steps.
- "Minimum viable production" checklist.
- Suggested tests, monitors, and controls.

Optional: make a small code change in the starter app to demonstrate one remediation.

## Agentic Workflow Prompt

```text
Audit exercises/ex-2-nfr-xray/starter-app as an enterprise NFR review.
Prioritize security, privacy, performance, scalability, accessibility, observability, operability, and resilience.
Return a severity-ranked report with evidence, remediation, and minimum production controls.
```

## Review Rubric

Strong submissions usually:

- Connect risks to business impact.
- Distinguish launch blockers from later hardening.
- Include both code-level and system-level controls.
- Call out missing requirements and assumptions.
- Recommend measurable tests and monitors.

