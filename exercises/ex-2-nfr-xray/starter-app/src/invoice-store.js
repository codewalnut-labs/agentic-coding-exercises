class InMemoryInvoiceStore {
  constructor() {
    this.invoices = [];
  }

  nextId() {
    return String(this.invoices.length + 1);
  }

  list() {
    return this.invoices;
  }

  save(invoice) {
    this.invoices.push(invoice);
  }

  find(id) {
    return this.invoices.find((invoice) => invoice.id === id);
  }
}

module.exports = { InMemoryInvoiceStore };

