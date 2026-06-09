import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { api, endpoints } from '../api/api.js';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext(null);

function normalizeCart(cart) {
  const items = cart?.items || cart?.cartItems || [];

  const total =
    cart?.total ||
    cart?.totalAmount ||
    items.reduce((sum, item) => {
      const product = item.product || item;
      return sum + Number(product.price || 0) * Number(item.quantity || 0);
    }, 0);

  return {
    ...cart,
    items,
    total
  };
}

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();

  const [cart, setCart] = useState({
    items: [],
    total: 0
  });

  const [loading, setLoading] = useState(false);

  async function loadCart() {
    if (!isAuthenticated) {
      setCart({ items: [], total: 0 });
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(endpoints.cart);

      console.log('Cart API Response:', response);

      const normalizedCart = normalizeCart(response);

      setCart(normalizedCart);
    } catch (error) {
      console.error('Failed to load cart:', error);
      setCart({ items: [], total: 0 });
    } finally {
      setLoading(false);
    }
  }

  async function addToCart(productId, quantity = 1) {
    try {
      await api.post(endpoints.cartItems, {
        productId,
        quantity
      });

      await loadCart();
    } catch (error) {
      console.error('Add to cart failed:', error);
    }
  }

  async function updateQuantity(productId, quantity) {
    try {
      await api.put(`${endpoints.cartItems}/${productId}`, {
        quantity
      });

      await loadCart();
    } catch (error) {
      console.error('Update quantity failed:', error);
    }
  }

  async function removeFromCart(productId) {
    try {
      await api.delete(`${endpoints.cartItems}/${productId}`);

      await loadCart();
    } catch (error) {
      console.error('Remove item failed:', error);
    }
  }

  async function clearCart() {
    try {
      await api.delete(endpoints.cart);

      setCart({
        items: [],
        total: 0
      });
    } catch (error) {
      console.error('Clear cart failed:', error);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setCart({
        items: [],
        total: 0
      });
    }
  }, [isAuthenticated]);

  const itemCount = cart.items.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const value = useMemo(
    () => ({
      cart,
      itemCount,
      loading,
      loadCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart
    }),
    [cart, itemCount, loading]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}