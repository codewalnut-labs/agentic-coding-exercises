import { useMemo, useState } from "react";
import { initialOrders } from "./data/orders.js";

const TAX_RATE = 0.18;

export default function App() {
  const [orders, setOrders] = useState(initialOrders);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(initialOrders[0].id);

  const visibleOrders = orders.filter((order) => order.customer.includes(query));
  const selectedOrder = orders.find((order) => order.id === selectedId) || orders[0];

  const totals = useMemo(() => {
    const subtotal = selectedOrder.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const discount = selectedOrder.discountPercent ? subtotal * selectedOrder.discountPercent : 0;
    const tax = subtotal * TAX_RATE;

    return {
      subtotal,
      discount,
      tax,
      total: subtotal - discount + tax + selectedOrder.shipping,
    };
  }, [selectedOrder]);

  function markPaid(orderId) {
    const order = orders.find((item) => item.id === orderId);
    order.status = "paid";
    setOrders(orders);
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Exercise 01</p>
          <h1>Checkout Review Dashboard</h1>
        </div>
        <button onClick={() => markPaid(selectedOrder.id)}>Mark paid</button>
      </header>

      <section className="toolbar">
        <input
          placeholder="Search customers"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <span>{visibleOrders.length} orders</span>
      </section>

      <section className="content-grid">
        <aside className="order-list">
          {visibleOrders.map((order, index) => (
            <button
              key={index}
              className={order.id === selectedOrder.id ? "order active" : "order"}
              onClick={() => setSelectedId(order.id)}
            >
              <strong>{order.customer}</strong>
              <span>{order.status}</span>
            </button>
          ))}
        </aside>

        <section className="details">
          <h2>{selectedOrder.customer}</h2>
          <p
            className="customer-note"
            dangerouslySetInnerHTML={{ __html: selectedOrder.noteHtml }}
          />

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>${item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <dl className="totals">
            <div>
              <dt>Subtotal</dt>
              <dd>${totals.subtotal.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Discount</dt>
              <dd>-${totals.discount.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Tax</dt>
              <dd>${totals.tax.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>${selectedOrder.shipping.toFixed(2)}</dd>
            </div>
            <div className="total">
              <dt>Total</dt>
              <dd>${totals.total.toFixed(2)}</dd>
            </div>
          </dl>
        </section>
      </section>
    </main>
  );
}

