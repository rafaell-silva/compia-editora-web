'use client';
import './cart.css';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotalPrice } = useCart();

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
      <div className="cart-items">
        {/* Adicionado o cabeçalho das colunas (será estilizado no próximo branch, mas já iniciamos a marcação) */}
        <div className="cart-header-row" style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr', fontWeight: 'bold', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#666' }}>
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

      <div className="cart-summary">
        <h2>Resumo do Pedido</h2>
        <div className="cart-summary__row">
          <span>Subtotal</span>
          <span>R$ {cartTotalPrice.toFixed(2)}</span>
        </div>
        <div className="cart-summary__row">
          <span>Frete</span>
          <span>A calcular</span>
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
