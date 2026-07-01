export const accessRequests = [
  {
    id: "acc-1001",
    employee: "Asha Nair",
    manager: "Ravi Menon",
    systemName: "Revenue Analytics",
    status: "draft",
    risk: "normal",
    provisioningHealthy: true,
    history: [{ actor: "Employee", action: "Started request draft" }],
  },
  {
    id: "acc-1002",
    employee: "Liam Chen",
    manager: "Nora Smith",
    systemName: "Customer Data Vault",
    status: "submitted",
    risk: "high",
    provisioningHealthy: true,
    history: [
      { actor: "Employee", action: "Submitted access request" },
      { actor: "System", action: "Classified request as high risk" },
    ],
  },
  {
    id: "acc-1003",
    employee: "Mina Roy",
    manager: "Aditi Rao",
    systemName: "Billing Admin",
    status: "manager-approved",
    risk: "normal",
    provisioningHealthy: false,
    history: [
      { actor: "Employee", action: "Submitted access request" },
      { actor: "Manager", action: "Approved manager review" },
    ],
  },
];

