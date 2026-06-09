import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, endpoints } from '../api/api.js';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get(`${endpoints.products}/${id}`).then(setProduct).catch((err) => setMessage(err.message));
  }, [id]);

  async function handleAdd() {
    await addToCart(product.id, quantity);
    setMessage('Added to cart.');
  }

  if (!product) return <p className="muted">{message || 'Loading product...'}</p>;

  return (
    <section className="detail-grid">
      <img className="detail-image" src={product.imageUrl || product.image_url || '/placeholder-product.svg'} alt={product.name} />
      <div className="detail-copy">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="lead">{product.description}</p>
        <strong className="price">${Number(product.price || 0).toFixed(2)}</strong>
        <p className={product.stock > 0 ? 'stock ok' : 'stock out'}>{product.stock} available</p>
        {message && <p className="alert success">{message}</p>}
        <div className="inline-controls">
          <input type="number" min="1" max={product.stock || 1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          <button className="btn primary" disabled={!isAuthenticated || product.stock <= 0} onClick={handleAdd}>Add to Cart</button>
          {!isAuthenticated && <Link className="btn ghost" to="/login">Login to Buy</Link>}
        </div>
      </div>
    </section>
  );
}

