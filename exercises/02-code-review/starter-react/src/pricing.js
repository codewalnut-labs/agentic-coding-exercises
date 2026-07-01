export function projectedTotal(renewal) {
  return renewal.contractValue - renewal.contractValue * renewal.discountPercent;
}

