'use client';
import { useState } from 'react';
import './cart.css';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartSubtotal, cartShipping, cartTotalPrice, updateShipping, selectedShipping } = useCart();
  
  const [cep, setCep] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateShipping = () => {
    if (cep.length < 8) return;
    setIsCalculating(true);
    
    setTimeout(() => {
      const options = [
        { id: 'correios', name: 'Correios PAC', price: 15.90, time: '7 a 10 dias úteis' },
        { id: 'sedex', name: 'Sedex Expresso', price: 35.50, time: '2 a 3 dias úteis' },
        { id: 'loja', name: 'Retirada na Loja', price: 0, time: 'A partir de amanhã' }
      ];
      setShippingOptions(options);
      if (!selectedShipping.option) {
        updateShipping(options[0], options[0].price);
      }
      setIsCalculating(false);
    }, 800);
  };

  const handleShippingChange = (option) => {
    updateShipping(option, option.price);
  };

  const shippingDisplay = selectedShipping.option
    ? (selectedShipping.price === 0 ? 'Grátis' : `R$ ${cartShipping.toFixed(2)}`)
    : 'A calcular';

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Seu carrinho está vazio.</h2>
        <p>Volte ao catálogo para adicionar livros incríveis!</p>
        <Link href="/" className="btn">Ver Catálogo</Link>
      </div>
    );
  }

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
              <div className="cart-item__product">
                <div className="book-cover book-cover--cart" style={{ '--book-color': item.color }}>
                  <div className="book-cover__spine"></div>
                  <div className="book-cover__front">
                    <span className="book-cover__author">{item.author}</span>
                    <h3 className="book-cover__title">{item.name}</h3>
                    <div className="book-cover__publisher">COMPIA</div>
                  </div>
                </div>
                <div className="cart-item__details">
                  <h3>{item.name}</h3>
                  <p className="cart-item__author">{item.author}</p>
                </div>
              </div>
              
              <div className="cart-item__price-unit">
                R$ {item.price.toFixed(2)}
              </div>
              
              <div className="quantity-control">
                <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              
              <div className="cart-item__subtotal">
                R$ {(item.price * item.quantity).toFixed(2)}
                <br/>
                <button type="button" className="cart-item__remove" onClick={() => removeFromCart(item.id)}>Remover</button>
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
            <button type="button" className="btn btn--secondary" onClick={calculateShipping} disabled={isCalculating}>
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
                    checked={selectedShipping.option?.id === option.id}
                    onChange={() => handleShippingChange(option)}
                  />
                  <div className="shipping-option__info">
                    <span className="shipping-option__name">{option.name}</span>
                    <span className="shipping-option__time">{option.time}</span>
                  </div>
                  <span className="shipping-option__price">
                    {option.price === 0 ? 'Grátis' : `R$ ${option.price.toFixed(2)}`}
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
          <span>R$ {cartSubtotal.toFixed(2)}</span>
        </div>
        <div className="cart-summary__row">
          <span>Frete</span>
          <span>{shippingDisplay}</span>
        </div>
        <hr />
        <div className="cart-summary__total">
          <span>Total</span>
          <span>R$ {cartTotalPrice.toFixed(2)}</span>
        </div>
        <Link href="/checkout" className="btn cart-summary__btn" style={{textAlign: 'center'}}>
          Finalizar Compra
        </Link>
      </div>
    </div>
  );
}
