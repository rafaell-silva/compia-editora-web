'use client';
import Link from 'next/link';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import './wishlist.css';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="wishlist-empty__icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h2>Sua lista de desejos está vazia</h2>
        <p>Explore nosso catálogo e salve os livros que você deseja.</p>
        <Link href="/" className="btn">Ver Catálogo</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>Lista de Desejos</h1>
        <p className="wishlist-count">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'itens'}</p>
      </div>
      
      <div className="wishlist-grid">
        {wishlistItems.map(product => (
          <article key={product.id} className="wishlist-card">
            <Link href={`/produto/${product.id}`} className="wishlist-card__link">
              <div className="book-cover book-cover--small" style={{ '--book-color': product.color }}>
                <div className="book-cover__spine"></div>
                <div className="book-cover__front">
                  <span className="book-cover__author">{product.author}</span>
                  <h3 className="book-cover__title">{product.name}</h3>
                  <div className="book-cover__publisher">COMPIA</div>
                </div>
              </div>
            </Link>
            
            <div className="wishlist-card__info">
              <Link href={`/produto/${product.id}`}>
                <h2 className="wishlist-card__title">{product.name}</h2>
              </Link>
              <p className="wishlist-card__author">{product.author}</p>
              <p className="wishlist-card__category">{product.category}</p>
              <p className="wishlist-card__price">R$ {product.price.toFixed(2)}</p>
              
              <div className="wishlist-card__actions">
                <button 
                  type="button"
                  className="btn wishlist-card__btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Mover para o Carrinho
                </button>
                <button 
                  type="button"
                  className="wishlist-card__remove"
                  onClick={() => removeFromWishlist(product.id)}
                  aria-label="Remover da lista de desejos"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
