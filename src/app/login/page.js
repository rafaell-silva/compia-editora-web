'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import './login.css';

export default function LoginPage() {
  const { login, register, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated()) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    let result;
    if (isRegistering) {
      const name = formData.get('name');
      result = await register(name, email, password);
    } else {
      result = await login(email, password);
    }

    setLoading(false);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>{isRegistering ? 'Criar Conta' : 'Entrar'}</h1>
        
        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="form-group">
              <input type="text" name="name" placeholder="Nome Completo" required />
            </div>
          )}
          <div className="form-group">
            <input type="email" name="email" placeholder="E-mail" required />
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="Senha" required minLength="6" />
          </div>
          <button type="submit" className="btn login-btn" disabled={loading}>
            {loading ? 'Carregando...' : (isRegistering ? 'Criar Conta' : 'Entrar')}
          </button>
        </form>

        <div className="login-toggle">
          {isRegistering ? (
            <p>Já tem uma conta? <button onClick={() => setIsRegistering(false)}>Entrar</button></p>
          ) : (
            <p>Não tem uma conta? <button onClick={() => setIsRegistering(true)}>Criar conta</button></p>
          )}
        </div>

        {!isRegistering && (
          <div className="login-demo">
            <p><strong>Demo:</strong> admin@comperia.com.br / admin123</p>
          </div>
        )}
      </div>
    </div>
  );
}
