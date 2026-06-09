import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, endpoints } from '../api/api.js';
import { useCart } from '../context/CartContext.jsx';

export default function Checkout() {
  const { cart, loadCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  async function handleCheckout(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post(endpoints.checkout, { shippingAddress });
      await clearCart();
      navigate('/orders');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="checkout-grid">
      <form className="form-card" onSubmit={handleCheckout}>
        <h1>Checkout</h1>
        {error && <p className="alert error">{error}</p>}
        <label>
          Shipping Address
          <textarea value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} required rows="5" />
        </label>
        <button className="btn primary wide" disabled={loading || cart.items.length === 0}>
          {loading ? 'Placing order...' : 'Place Order'}
        </button>
      </form>
      <aside className="order-summary">
        <h2>Order Summary</h2>
        {cart.items.map((item) => {
          const product = item.product || item;
          return <p key={product.id}>{product.name} x {item.quantity}</p>;
        })}
        <strong>Total: ${Number(cart.total || 0).toFixed(2)}</strong>
      </aside>
    </section>
  );
}

