import { useEffect, useState } from 'react';
import { api, endpoints } from '../../api/api.js';

const emptyProduct = {
  name: '',
  description: '',
  price: '',
  imageUrl: '',
  stock: '',
  category: '',
  active: true
};

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  async function loadProducts() {
    const data = await api.get(endpoints.products);
    setProducts(Array.isArray(data) ? data : data.content || data.products || []);
  }

  useEffect(() => {
    loadProducts().catch((err) => setError(err.message));
  }, []);

  function edit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      imageUrl: product.imageUrl || product.image_url || '',
      stock: product.stock || '',
      category: product.category || '',
      active: product.active !== false
    });
  }

  async function save(event) {
    event.preventDefault();
    setError('');
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock)
    };
    try {
      if (editingId) {
        await api.put(`${endpoints.adminProducts}/${editingId}`, payload);
      } else {
        await api.post(endpoints.adminProducts, payload);
      }
      setForm(emptyProduct);
      setEditingId(null);
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    await api.delete(`${endpoints.adminProducts}/${id}`);
    await loadProducts();
  }

  return (
    <section className="admin-products">
      <div className="section-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Manage Products</h1>
        </div>
      </div>
      {error && <p className="alert error">{error}</p>}

      <form className="product-form" onSubmit={save}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input placeholder="Price" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
        <input placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <label className="checkbox-row">
          <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
          Active
        </label>
        <button className="btn primary">{editingId ? 'Update Product' : 'Create Product'}</button>
        {editingId && <button type="button" className="btn ghost" onClick={() => { setEditingId(null); setForm(emptyProduct); }}>Cancel</button>}
      </form>

      <div className="table-card">
        {products.map((product) => (
          <div className="admin-row" key={product.id}>
            <img src={product.imageUrl || product.image_url || '/placeholder-product.svg'} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p className="muted">{product.category} · ${Number(product.price || 0).toFixed(2)} · Stock {product.stock}</p>
            </div>
            <button className="btn ghost" onClick={() => edit(product)}>Edit</button>
            <button className="btn danger" onClick={() => remove(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
}

