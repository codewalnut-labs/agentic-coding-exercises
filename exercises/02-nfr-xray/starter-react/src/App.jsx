import { useEffect, useState } from "react";
import { seedInvoices } from "./data/seedInvoices.js";

const STORAGE_KEY = "invoice-portal-records";

export default function App() {
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : seedInvoices;
  });
  const [form, setForm] = useState({
    tenant: "demo-tenant",
    vendor: "",
    amount: "",
    ownerEmail: "",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
  }, [invoices]);

  function updateField(name, value) {
    setForm({ ...form, [name]: value });
  }

  function addInvoice(event) {
    event.preventDefault();
    const file = event.target.invoiceFile.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const nextInvoice = {
        id: crypto.randomUUID(),
        tenant: form.tenant,
        vendor: form.vendor || "Unknown vendor",
        ownerEmail: form.ownerEmail,
        amount: Number(form.amount),
        status: "pending",
        uploadedAt: new Date().toISOString(),
        fileName: file.name,
        filePreview: reader.result,
      };

      console.log("invoice uploaded", nextInvoice);
      setInvoices([nextInvoice, ...invoices]);
      event.target.reset();
    };

    reader.readAsDataURL(file);
  }

  function approveInvoice(id) {
    setInvoices(
      invoices.map((invoice) =>
        invoice.id === id
          ? { ...invoice, status: "approved", approvedAt: new Date().toISOString() }
          : invoice,
      ),
    );
  }

  return (
    <main className="app-shell">
      <header>
        <p className="eyebrow">Exercise 02</p>
        <h1>Invoice Review Portal</h1>
      </header>

      <section className="layout">
        <form className="upload-panel" onSubmit={addInvoice}>
          <h2>Upload invoice</h2>
          <input
            placeholder="Tenant"
            defaultValue={form.tenant}
            onChange={(event) => updateField("tenant", event.target.value)}
          />
          <input
            placeholder="Vendor"
            onChange={(event) => updateField("vendor", event.target.value)}
          />
          <input
            placeholder="Amount"
            onChange={(event) => updateField("amount", event.target.value)}
          />
          <input
            placeholder="Owner email"
            onChange={(event) => updateField("ownerEmail", event.target.value)}
          />
          <input name="invoiceFile" type="file" />
          <button>Upload</button>
        </form>

        <section className="queue">
          <h2>Pending queue</h2>
          {invoices.map((invoice) => (
            <article className="invoice-card" key={invoice.id}>
              <div>
                <strong>{invoice.vendor}</strong>
                <p>{invoice.tenant}</p>
                <p>{invoice.ownerEmail}</p>
              </div>
              <div>
                <span>${invoice.amount}</span>
                <span className={invoice.status}>{invoice.status}</span>
              </div>
              <button onClick={() => approveInvoice(invoice.id)}>Approve</button>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

