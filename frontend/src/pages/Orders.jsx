import { useEffect, useState } from 'react';
import { api, endpoints } from '../api/api.js';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(endpoints.orders)
      .then((data) => setOrders(Array.isArray(data) ? data : data.orders || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <div className="section-header">
        <div>
          <p className="eyebrow">History</p>
          <h1>Your Orders</h1>
        </div>
      </div>
      {error && <p className="alert error">{error}</p>}
      <div className="order-list">
        {orders.map((order) => (
          <article className="order-card" key={order.id}>
            <div className="card-row">
              <h3>Order #{order.id}</h3>
              <span className="status">{order.status}</span>
            </div>
            <p className="muted">{new Date(order.createdAt || order.created_at || Date.now()).toLocaleString()}</p>
            <p>{order.shippingAddress}</p>
            <div className="line-items">
              {(order.items || order.orderItems || []).map((item) => (
                <span key={item.id || item.productId}>{item.productName || item.product?.name} x {item.quantity}</span>
              ))}
            </div>
            <strong>Total: ${Number(order.totalAmount || order.total || 0).toFixed(2)}</strong>
          </article>
        ))}
      </div>
      {orders.length === 0 && !error && <p className="empty">No orders yet.</p>}
    </section>
  );
}

