'use client';
import { useState } from 'react';
import './cart.css';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotalPrice } = useCart();
  
  const [cep, setCep] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateShipping = () => {
    if (cep.length < 8) return;
    setIsCalculating(true);
    
    // Simulating API call
    setTimeout(() => {
      setShippingOptions([
        { id: 'correios', name: 'Correios PAC', price: 15.90, time: '7 a 10 dias úteis' },
        { id: 'sedex', name: 'Sedex Expresso', price: 35.50, time: '2 a 3 dias úteis' },
        { id: 'loja', name: 'Retirada na Loja', price: 0, time: 'A partir de amanhã' }
      ]);
      setSelectedShipping(15.90);
      setIsCalculating(false);
    }, 800);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Seu carrinho está vazio.</h2>
        <p>Volte ao catálogo para adicionar livros incríveis!</p>
        <Link href="/" className="btn">Ver Catálogo</Link>
      </div>
    );
  }

  const finalTotal = cartTotalPrice + selectedShipping;

  return (
    <div className="cart-layout">
      <div className="cart-main">
        <div className="cart-items">
          <div className="cart-header-row">
            <span>Produto</span>
            <span style={{textAlign: 'center'}}>Preço</span>
            <span style={{textAlign: 'center'}}>Qtd</span>
            <span style={{textAlign: 'right'}}>Subtotal</span>
          </div>
          
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item__image" style={{ backgroundColor: item.color }}></div>
              <div className="cart-item__details">
                <h3>{item.name}</h3>
                <p className="cart-item__author">{item.author}</p>
              </div>
              
              <div className="cart-item__price-unit">
                R$ {item.price.toFixed(2)}
              </div>
              
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              
              <div className="cart-item__subtotal">
                R$ {(item.price * item.quantity).toFixed(2)}
                <br/>
                <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>Remover</button>
              </div>
            </div>
          ))}
        </div>

        <div className="shipping-calculator">
          <h3>Calcule o Frete</h3>
          <div className="shipping-form">
            <input 
              type="text" 
              placeholder="Digite seu CEP" 
              value={cep} 
              onChange={(e) => setCep(e.target.value)} 
              maxLength="9"
            />
            <button className="btn btn--secondary" onClick={calculateShipping} disabled={isCalculating}>
              {isCalculating ? 'Calculando...' : 'Calcular'}
            </button>
          </div>

          {shippingOptions.length > 0 && (
            <div className="shipping-options">
              {shippingOptions.map(option => (
                <label key={option.id} className="shipping-option">
                  <input 
                    type="radio" 
                    name="shipping" 
                    value={option.price} 
                    checked={selectedShipping === option.price}
                    onChange={() => setSelectedShipping(option.price)}
                  />
                  <div className="shipping-option__info">
                    <span className="shipping-option__name">{option.name}</span>
                    <span className="shipping-option__time">{option.time}</span>
                  </div>
                  <span className="shipping-option__price">
                    {option.price === 0 ? 'Grátis' : \`R$ \${option.price.toFixed(2)}\`}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="cart-summary">
        <h2>Resumo do Pedido</h2>
        <div className="cart-summary__row">
          <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} itens)</span>
          <span>R$ {cartTotalPrice.toFixed(2)}</span>
        </div>
        <div className="cart-summary__row">
          <span>Frete</span>
          <span>{selectedShipping === 0 ? (shippingOptions.length > 0 ? 'Grátis' : 'A calcular') : \`R$ \${selectedShipping.toFixed(2)}\`}</span>
        </div>
        <hr />
        <div className="cart-summary__total">
          <span>Total</span>
          <span>R$ {finalTotal.toFixed(2)}</span>
        </div>
        <Link href="/checkout" className="btn cart-summary__btn" style={{textAlign: 'center'}}>
          Finalizar Compra
        </Link>
      </div>
    </div>
  );
}
