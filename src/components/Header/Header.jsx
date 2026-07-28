'use client';
import './header.css';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Header() {
  const { cartTotalItems } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { wishlistItems } = useWishlist();

  return (
    <header className="header">
      <div className="header__logo">
        <Link href="/" className="header__logo-link" aria-label="COMPIA Editora - Página inicial">
          <h1>COMPIA Editora</h1>
        </Link>
      </div>
      <nav className="header__nav" aria-label="Menu principal">
        <ul>
          <li><Link href="/" className="header__nav-link">Catálogo</Link></li>
          <li>
            <Link href="/wishlist" className="header__nav-link" aria-label={`Lista de desejos - ${wishlistItems.length} itens`}>
              Desejos {wishlistItems.length > 0 ? `(${wishlistItems.length})` : ''}
            </Link>
          </li>
          <li>
            <Link href="/carrinho" className="header__nav-link" aria-label={`Carrinho de compras - ${cartTotalItems} itens`}>
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
                <button onClick={logout} className="header__navlink header__nav-link--btn" aria-label={`Sair da conta de ${user.name}`}>
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
