import { useEffect, useState } from 'react';
import { api, endpoints } from '../../api/api.js';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(endpoints.adminOrders)
      .then((data) => setOrders(Array.isArray(data) ? data : data.orders || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <div className="section-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Manage Orders</h1>
        </div>
      </div>
      {error && <p className="alert error">{error}</p>}
      <div className="table-card">
        {orders.map((order) => (
          <div className="admin-order-row" key={order.id}>
            <div>
              <h3>Order #{order.id}</h3>
              <p className="muted">{order.user?.email || order.userEmail || 'Customer'} · {order.status}</p>
            </div>
            <p>{order.shippingAddress}</p>
            <strong>${Number(order.totalAmount || order.total || 0).toFixed(2)}</strong>
          </div>
        ))}
      </div>
      {orders.length === 0 && !error && <p className="empty">No orders found.</p>}
    </section>
  );
}
