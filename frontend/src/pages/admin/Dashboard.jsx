import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <section>
      <div className="section-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Dashboard</h1>
        </div>
      </div>
      <div className="admin-grid">
        <Link className="admin-tile" to="/admin/products">
          <span className="metric">Products</span>
          <p>Create, update, and remove catalog items.</p>
        </Link>
        <Link className="admin-tile" to="/admin/orders">
          <span className="metric">Orders</span>
          <p>Review customer checkout history.</p>
        </Link>
      </div>
    </section>
  );
}

