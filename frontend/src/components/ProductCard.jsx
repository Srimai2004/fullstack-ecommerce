import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  async function handleAdd() {
    await addToCart(product.id, 1);
  }

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-wrap">
        <img src={product.imageUrl || product.image_url || '/placeholder-product.svg'} alt={product.name} />
      </Link>
      <div className="product-card-body">
        <p className="eyebrow">{product.category || 'Product'}</p>
        <h3>{product.name}</h3>
        <p className="muted clamp">{product.description}</p>
        <div className="card-row">
          <strong>${Number(product.price || 0).toFixed(2)}</strong>
          <span className={product.stock > 0 ? 'stock ok' : 'stock out'}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        <div className="card-actions">
          <Link className="btn ghost" to={`/products/${product.id}`}>View</Link>
          <button className="btn primary" disabled={!isAuthenticated || product.stock <= 0} onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
