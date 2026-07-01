# Feature Brief: Access Request Approval

Employees request access to a sensitive internal tool. Managers approve or reject the request. Security reviews high-risk requests before access is granted.

## Actors

- Employee: creates the request.
- Manager: approves or rejects normal requests.
- Security: reviews high-risk requests.
- Provisioning system: grants access after approvals.

## Important States

- Draft
- Submitted
- Manager approved
- Security review
- Provisioned
- Rejected
- Failed provisioning

## Diagram Expectations

The sequence diagram should show who talks to whom.

The flow diagram should show decision points and state transitions.

