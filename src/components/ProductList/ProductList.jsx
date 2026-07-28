'use client';
import { useState } from 'react';
import Link from 'next/link';
import './productList.css';
import { useCart } from '../../context/CartContext';
import { SkeletonCard } from '../Skeleton/Skeleton';

export default function ProductList({ products, isLoading = false }) {
  const { addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState('');

  const handleAdd = (product) => {
    addToCart(product);
    setToastMessage(`"${product.name}" adicionado ao carrinho!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  if (isLoading) {
    return (
      <div className="product-list">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      {toastMessage && (
        <div className="toast-feedback">
          {toastMessage}
        </div>
      )}
      
      <div className="product-list">
        {products.map(product => (
          <article key={product.id} className="product-card">
            <Link href={`/produto/${product.id}`} className="product-card__link">
              <div className="book-cover" style={{ '--book-color': product.color }}>
                <div className="book-cover__spine"></div>
                <div className="book-cover__front">
                  <span className="book-cover__author">{product.author}</span>
                  <h3 className="book-cover__title">{product.name}</h3>
                  <div className="book-cover__publisher">COMPIA</div>
                </div>
              </div>
            </Link>
            
            <div className="product-card__info">
              <Link href={`/produto/${product.id}`}>
                <h2 className="product-card__title">{product.name}</h2>
              </Link>
              <p className="product-card__category">{product.category}</p>
              <p className="product-card__price">R$ {product.price.toFixed(2)}</p>
              <button 
                className="btn product-card__btn"
                onClick={() => handleAdd(product)}
              >
                Adicionar
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}