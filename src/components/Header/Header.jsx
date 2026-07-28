'use client';
import './header.css';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { cartTotalItems } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__logo">
        <Link href="/" className="header__logo-link">
          <h1>COMPIA Editora</h1>
        </Link>
      </div>
      <nav className="header__nav">
        <ul>
          <li><Link href="/" className="header__nav-link">Catálogo</Link></li>
          <li><Link href="/sobre" className="header__nav-link">Sobre</Link></li>
          <li><Link href="/faq" className="header__nav-link">FAQ</Link></li>
          <li>
            <Link href="/carrinho" className="header__nav-link">
              Carrinho <span className="cart-badge">{cartTotalItems > 0 ? `(${cartTotalItems})` : ''}</span>
            </Link>
          </li>
          {isAuthenticated() ? (
            <>
              <li><Link href="/pedidos" className="header__nav-link">Meus Pedidos</Link></li>
              {isAdmin() && (
                <li><Link href="/admin" className="header__nav-link header__nav-link--admin">Admin</Link></li>
              )}
              <li>
                <button onClick={logout} className="header__nav-link header__nav-link--btn">
                  Sair ({user.name.split(' ')[0]})
                </button>
              </li>
            </>
          ) : (
            <li><Link href="/login" className="header__nav-link">Entrar</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}
