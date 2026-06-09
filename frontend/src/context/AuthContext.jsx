import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, endpoints } from '../api/api.js';

const AuthContext = createContext(null);

function normalizeUser(payload) {
  const user = payload?.user || payload;
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || user.authorities?.[0]?.authority || 'ROLE_USER'
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const isAuthenticated = Boolean(token && user);
  const isAdmin = user?.role === 'ROLE_ADMIN' || user?.role === 'ADMIN';

  useEffect(() => {
    async function loadProfile() {
      if (!token || user) return;
      try {
        const profile = normalizeUser(await api.get(endpoints.me));
        setUser(profile);
        localStorage.setItem('user', JSON.stringify(profile));
      } catch {
        logout();
      }
    }
    loadProfile();
  }, [token]);

  async function login(credentials) {
    setLoading(true);
    try {
      const data = await api.post(endpoints.login, credentials);
      const jwt = data.token || data.accessToken || data.jwt;
      if (!jwt) throw new Error('Login response did not include a token');
      localStorage.setItem('token', jwt);
      const profile = normalizeUser(data.user ? data : await api.get(endpoints.me));
      setUser(profile);
      localStorage.setItem('user', JSON.stringify(profile));
      return profile;
    } finally {
      setLoading(false);
    }
  }

  async function register(payload) {
    setLoading(true);
    try {
      return await api.post(endpoints.register, payload);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, loading, isAuthenticated, isAdmin, login, register, logout }),
    [user, loading, isAuthenticated, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}

