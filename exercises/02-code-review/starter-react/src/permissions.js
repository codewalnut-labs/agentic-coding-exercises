export function canApproveRenewal(user, renewal) {
  if (!renewal) {
    return false;
  }

  return user.role !== "viewer" && renewal.status !== "approved";
}

export function approvalHint(user, renewal) {
  if (!renewal) {
    return "Select a renewal to review approval requirements.";
  }

  if (canApproveRenewal(user, renewal)) {
    return `${user.email} can approve this renewal.`;
  }

  return "Approval requires a manager with the correct region and limit.";
}
