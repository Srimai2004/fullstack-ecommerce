import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { api, endpoints } from '../api/api.js';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadProducts(query = '') {
    setLoading(true);
    setError('');
    try {
      const data = await api.get(`${endpoints.products}${query ? `?search=${encodeURIComponent(query)}` : ''}`);
      setProducts(Array.isArray(data) ? data : data.content || data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleSearch(event) {
    event.preventDefault();
    loadProducts(search.trim());
  }

  return (
    <section>
      <div className="section-header">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1>Products</h1>
        </div>
        <form className="search-bar" onSubmit={handleSearch}>
          <input value={search} placeholder="Search products" onChange={(e) => setSearch(e.target.value)} />
          <button className="btn primary">Search</button>
        </form>
      </div>

      {error && <p className="alert error">{error}</p>}
      {loading ? <p className="muted">Loading products...</p> : (
        <div className="product-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
      {!loading && products.length === 0 && <p className="empty">No products found.</p>}
    </section>
  );
}

