import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="home-grid">
      <div className="home-copy">
        <p className="eyebrow">Full-stack commerce</p>
        <h1>Shop products, manage carts, and run orders from one clean app.</h1>
        <p className="lead">
          Browse inventory, search by keyword, checkout securely, and manage catalog operations with role-based access.
        </p>
        <div className="hero-actions">
          <Link className="btn primary" to="/products">Browse Products</Link>
          <Link className="btn ghost" to="/login">Sign In</Link>
        </div>
      </div>
      <div className="home-panel">
        <div>
          <span className="metric">JWT</span>
          <p>Stateless authentication</p>
        </div>
        <div>
          <span className="metric">CRUD</span>
          <p>Admin product controls</p>
        </div>
        <div>
          <span className="metric">REST</span>
          <p>Spring Boot API integration</p>
        </div>
      </div>
    </section>
  );
}

