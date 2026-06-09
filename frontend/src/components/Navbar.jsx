import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="navbar">
      <NavLink className="brand" to="/">ShopSphere</NavLink>
      <nav className="nav-links">
        <NavLink to="/products">Products</NavLink>
        {isAuthenticated && <NavLink to="/cart">Cart ({itemCount})</NavLink>}
        {isAuthenticated && <NavLink to="/orders">Orders</NavLink>}
        {isAdmin && <NavLink to="/admin">Admin</NavLink>}
      </nav>
      <div className="nav-actions">
        {isAuthenticated ? (
          <>
            <span className="user-chip">{user?.name || user?.email}</span>
            <button className="btn ghost" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink className="btn ghost" to="/login">Login</NavLink>
            <NavLink className="btn primary" to="/register">Register</NavLink>
          </>
        )}
      </div>
    </header>
  );
}

