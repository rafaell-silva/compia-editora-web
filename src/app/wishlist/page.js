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
        <h2>Sua lista de desejos está vazia</h2>
        <p>Explore nosso catálogo e adicione livros que você deseja!</p>
        <Link href="/" className="btn">Ver Catálogo</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h1>Lista de Desejos</h1>
      
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
              <p className="wishlist-card__category">{product.category}</p>
              <p className="wishlist-card__price">R$ {product.price.toFixed(2)}</p>
              
              <div className="wishlist-card__actions">
                <button 
                  className="btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Adicionar ao Carrinho
                </button>
                <button 
                  className="btn btn--secondary"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  Remover
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
