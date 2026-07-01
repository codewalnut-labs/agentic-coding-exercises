export function nextStepFor(request) {
  if (request.status === "draft") {
    return {
      status: "submitted",
      event: { actor: "Employee", action: "Submitted access request" },
    };
  }

  if (request.status === "submitted") {
    return {
      status: request.risk === "high" ? "security-review" : "manager-approved",
      event: { actor: "Manager", action: "Approved manager review" },
    };
  }

  if (request.status === "security-review") {
    return {
      status: "manager-approved",
      event: { actor: "Security", action: "Approved high-risk access" },
    };
  }

  if (request.status === "manager-approved") {
    return {
      status: request.provisioningHealthy ? "provisioned" : "failed-provisioning",
      event: { actor: "Provisioning system", action: "Attempted access grant" },
    };
  }

  return {
    status: request.status,
    event: { actor: "System", action: "No next transition available" },
  };
}

