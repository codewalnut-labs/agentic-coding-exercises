export const initialOrders = [
  {
    id: "ord-1001",
    customer: "Acme Finance",
    status: "pending",
    discountPercent: 10,
    shipping: 15,
    noteHtml: "Priority customer. <strong>Ship today.</strong>",
    items: [
      { name: "Analytics seat", qty: 3, price: 120 },
      { name: "Implementation call", qty: 1, price: 250 },
    ],
  },
  {
    id: "ord-1002",
    customer: "Northstar Retail",
    status: "pending",
    discountPercent: 0.05,
    shipping: 25,
    noteHtml: "Asked for invoice copy by email.",
    items: [
      { name: "Commerce dashboard", qty: 2, price: 180 },
      { name: "Training session", qty: 2, price: 90 },
    ],
  },
  {
    id: "ord-1003",
    customer: "Zenith Health",
    status: "blocked",
    discountPercent: 0,
    shipping: 0,
    noteHtml: "Security review required before processing.",
    items: [
      { name: "Compliance add-on", qty: 1, price: 500 },
      { name: "Support plan", qty: 1, price: 150 },
    ],
  },
];

