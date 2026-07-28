'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const STORAGE_KEY = 'comperia-auth';

function loadUser() {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

// Mock de usuários para demonstração
const MOCK_USERS = [
  { id: 1, name: 'Admin COMPIA', email: 'admin@comperia.com.br', role: 'admin', password: 'admin123' },
  { id: 2, name: 'Carlos Leitor', email: 'carlos@email.com', role: 'customer', password: '123456' },
  { id: 3, name: 'Ana Editora', email: 'ana@comperia.com.br', role: 'editor', password: 'editor123' }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return { success: true, user: userData };
    }
    return { success: false, error: 'E-mail ou senha inválidos' };
  };

  const register = async (name, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (MOCK_USERS.find(u => u.email === email)) {
      return { success: false, error: 'E-mail já cadastrado' };
    }
    const newUser = {
      id: MOCK_USERS.length + 1,
      name,
      email,
      role: 'customer'
    };
    MOCK_USERS.push({ ...newUser, password });
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = () => user?.role === 'admin';
  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAdmin,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
