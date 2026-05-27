import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { post, get } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token && !!user;

  const verifyToken = useCallback(async () => {
    const storedToken = localStorage.getItem('admin_token');
    if (!storedToken) {
      setLoading(false);
      return;
    }
    try {
      const res = await get('/auth/verify');
      setUser(res.data.admin || { username: 'admin' });
      setToken(storedToken);
    } catch {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const login = async (username, password) => {
    const res = await post('/auth/login', { username, password });
    const { token: newToken, admin: userData } = res.data;
    localStorage.setItem('admin_token', newToken);
    localStorage.setItem('admin_user', JSON.stringify(userData || { username }));
    setToken(newToken);
    setUser(userData || { username });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
