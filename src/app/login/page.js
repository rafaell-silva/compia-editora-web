'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import './login.css';

const DEMO_USERS = [
  { name: 'Admin', email: 'admin@comperia.com.br', password: 'admin123', role: 'admin', label: 'Administrador' }, // NOSONAR
  { name: 'Carlos Leitor', email: 'carlos@email.com', password: '123456', role: 'customer', label: 'Cliente' },   // NOSONAR
  { name: 'Ana Editora', email: 'ana@comperia.com.br', password: 'editor123', role: 'editor', label: 'Editora' }  // NOSONAR
];

export default function LoginPage() {
  const { login, register, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (isAuthenticated()) {
    router.push('/');
    return null;
  }

  const handleDemoLogin = (user) => {
    setFormData({ name: user.name, email: user.email, password: user.password });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let result;
    if (isRegistering) {
      result = await register(formData.name, formData.email, formData.password);
    } else {
      result = await login(formData.email, formData.password);
    }

    setLoading(false);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error);
    }
  };

  const formTitle = isRegistering ? 'Criar Conta' : 'Entrar';
  const submitLabel = loading ? 'Carregando...' : formTitle;

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>{formTitle}</h1>
        
        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="form-group">
              <input 
                type="text" 
                name="name" 
                placeholder="Nome Completo" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              placeholder="E-mail" 
              required 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              name="password" 
              placeholder="Senha" 
              required 
              minLength="6"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn login-btn" disabled={loading}>
            {submitLabel}
          </button>
        </form>

        <div className="login-toggle">
          {isRegistering ? (
            <p>Já tem uma conta? <button type="button" onClick={() => setIsRegistering(false)}>Entrar</button></p>
          ) : (
            <p>Não tem uma conta? <button type="button" onClick={() => setIsRegistering(true)}>Criar conta</button></p>
          )}
        </div>

        {!isRegistering && (
          <div className="login-demo">
            <p className="login-demo__title">Contas de demonstração:</p>
            <div className="login-demo__list">
              {DEMO_USERS.map((user) => (
                <button
                  key={user.email}
                  type="button"
                  className="login-demo__btn"
                  onClick={() => handleDemoLogin(user)}
                >
                  <span className="login-demo__label">{user.label}</span>
                  <span className="login-demo__email">{user.email}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
