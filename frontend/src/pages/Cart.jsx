import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

function getProduct(item) {
  return item.product || item;
}

export default function Cart() {
  const { cart, loading, loadCart, updateQuantity, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    loadCart();
  }, []);

  if (loading) return <p className="muted">Loading cart...</p>;

  return (
    <section>
      <div className="section-header">
        <div>
          <p className="eyebrow">Shopping</p>
          <h1>Your Cart</h1>
        </div>
        {cart.items.length > 0 && <button className="btn ghost" onClick={clearCart}>Clear Cart</button>}
      </div>

      {cart.items.length === 0 ? <p className="empty">Your cart is empty.</p> : (
        <>
          <div className="table-card">
            {cart.items.map((item) => {
              const product = getProduct(item);
              return (
                <div className="cart-row" key={product.id}>
                  <img src={product.imageUrl || product.image_url || '/placeholder-product.svg'} alt={product.name} />
                  <div>
                    <h3>{product.name}</h3>
                    <p className="muted">${Number(product.price || 0).toFixed(2)}</p>
                  </div>
                  <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(product.id, Number(e.target.value))} />
                  <strong>${(Number(product.price || 0) * Number(item.quantity || 0)).toFixed(2)}</strong>
                  <button className="btn ghost" onClick={() => removeFromCart(product.id)}>Remove</button>
                </div>
              );
            })}
          </div>
          <div className="summary-bar">
            <strong>Total: ${Number(cart.total || 0).toFixed(2)}</strong>
            <Link className="btn primary" to="/checkout">Checkout</Link>
          </div>
        </>
      )}
    </section>
  );
}

