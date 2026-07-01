export function projectedTotal(renewal) {
  return renewal.contractValue - renewal.contractValue * renewal.discountPercent + renewal.expansionARR;
}

export function marginAfterDiscount(renewal) {
  return projectedTotal(renewal) * renewal.grossMarginPercent;
}

export function summarizePortfolio(renewals) {
  const projectedRevenue = renewals.reduce((total, renewal) => total + projectedTotal(renewal), 0);
  const exceptionCount = renewals.filter((renewal) => renewal.status === "exception-requested").length;
  const highDiscountCount = renewals.filter((renewal) => renewal.discountPercent > 0.25).length;
  const weightedDiscount =
    renewals.reduce((total, renewal) => total + renewal.discountPercent * renewal.contractValue, 0) /
    renewals.reduce((total, renewal) => total + renewal.contractValue, 0);

  return {
    projectedRevenue,
    exceptionCount,
    highDiscountCount,
    weightedDiscount,
  };
}

export function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
