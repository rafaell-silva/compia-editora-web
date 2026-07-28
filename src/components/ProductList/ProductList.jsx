'use client';
import { useState } from 'react';
import './productList.css';
import { useCart } from '../../context/CartContext';

export default function ProductList({ products }) {
  const { addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState('');

  const handleAdd = (product) => {
    addToCart(product);
    setToastMessage(`"${product.name}" adicionado ao carrinho!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

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
            <div className="book-cover" style={{ '--book-color': product.color }}>
              <div className="book-cover__spine"></div>
              <div className="book-cover__front">
                <span className="book-cover__author">{product.author}</span>
                <h3 className="book-cover__title">{product.name}</h3>
                <div className="book-cover__publisher">COMPIA</div>
              </div>
            </div>
            
            <div className="product-card__info">
              <h2 className="product-card__title">{product.name}</h2>
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