const DEFAULT_DRAFT = {
  vendor: "",
  ownerEmail: "",
  justification: "",
};

const STORAGE_KEY = "vendor-risk-draft";
const DEMO_TOKEN_KEY = "vendor-risk-demo-token";

export function loadDraft() {
  localStorage.setItem(DEMO_TOKEN_KEY, "demo-admin-token");
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : DEFAULT_DRAFT;
}

export function saveDraft(draft) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

