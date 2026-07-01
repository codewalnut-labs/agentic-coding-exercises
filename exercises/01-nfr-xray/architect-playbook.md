# Architect Playbook

Use this checklist to guide the NFR X-Ray.

## 1. System Understanding

- What feature does the app implement?
- What user roles and data flows exist?
- What sensitive data is handled?
- What assumptions are hidden in client-side code?

## 2. Security And Privacy

- Authentication and authorization boundaries.
- Tenant isolation.
- Sensitive data storage.
- Secrets in browser code.
- Unsafe rendering.
- Input validation.
- Audit trail requirements.

## 3. Performance And Scalability

- Rendering large datasets.
- Pagination or virtualization.
- Client-side filtering costs.
- Network request patterns.
- Caching and stale data.
- Backpressure and retry behavior.

## 4. Accessibility

- Form labels and names.
- Keyboard navigation.
- Focus states.
- Color contrast.
- Error messaging.
- Screen reader structure.

## 5. Testing And Quality

- Unit test coverage.
- Integration or workflow tests.
- Accessibility tests.
- Security checks.
- Regression-prone code.
- Maintainability risks.

## 6. Operability

- Logging and telemetry.
- Error boundaries.
- Monitoring signals.
- Feature flags.
- Incident support data.
- Production runbook needs.

## Severity Model

- Critical: blocks enterprise production use.
- High: likely production incident, security issue, or compliance issue.
- Medium: important hardening gap.
- Low: quality improvement or nice-to-have.

