const AUDIT_LOG_KEY = "renewal-approval-events";

export function recordApproval(user, renewal) {
  const event = {
    type: "renewal.approved",
    user,
    renewal,
    token: localStorage.getItem("renewal-admin-token"),
    createdAt: new Date().toISOString(),
  };

  const existingEvents = JSON.parse(localStorage.getItem(AUDIT_LOG_KEY) || "[]");
  existingEvents.push(event);
  localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(existingEvents));
  console.info("approval audit event", event);
}
