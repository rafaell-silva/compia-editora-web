'use client';
import { useState } from 'react';
import './cart.css';

// Usando um estado inicial mockado para fins de demonstração
const initialCart = [
  { id: 1, name: 'Introdução à Inteligência Artificial', author: 'Marcos Silva', price: 89.90, quantity: 1, color: '#4a90e2' },
  { id: 2, name: 'Arquitetura de Software Inteligente', author: 'Ana Clara', price: 120.00, quantity: 2, color: '#e74c3c' }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCart);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Seu carrinho está vazio.</h2>
        <p>Volte ao catálogo para adicionar livros incríveis!</p>
        <a href="/" className="btn">Ver Catálogo</a>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item__image" style={{ backgroundColor: item.color }}></div>
            <div className="cart-item__details">
              <h3>{item.name}</h3>
              <p className="cart-item__author">{item.author}</p>
            </div>
            <div className="cart-item__actions">
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <p className="cart-item__price">R$ {(item.price * item.quantity).toFixed(2)}</p>
              <button className="cart-item__remove" onClick={() => removeItem(item.id)}>Remover</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Resumo do Pedido</h2>
        <div className="cart-summary__row">
          <span>Subtotal</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <div className="cart-summary__row">
          <span>Frete</span>
          <span>A calcular</span>
        </div>
        <hr />
        <div className="cart-summary__total">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <button className="btn cart-summary__btn">Finalizar Compra</button>
      </div>
    </div>
  );
}
