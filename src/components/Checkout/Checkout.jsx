'use client';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './checkout.css';

export default function Checkout() {
  const { cartItems = [], cartTotalPrice = 0 } = useCart() || {};
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isSuccess, setIsSuccess] = useState(false);

  // Fake shipping value for demonstration if not passed via context
  const finalTotal = cartTotalPrice > 0 ? Number(cartTotalPrice) + 15.90 : 0; 

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="checkout-success">
        <h2>🎉 Pedido Realizado com Sucesso!</h2>
        <p>Agradecemos por comprar na COMPIA Editora. Em breve você receberá um e-mail com os detalhes do envio.</p>
        <a href="/" className="btn">Voltar ao Catálogo</a>
      </div>
    );
  }

  return (
    <div className="checkout-layout">
      <div className="checkout-forms">
        <form onSubmit={handleCheckout} id="checkout-form">
          <div className="form-section">
            <h3>1. Dados Pessoais</h3>
            <div className="form-group">
              <input type="text" placeholder="Nome Completo" required />
            </div>
            <div className="form-group row">
              <input type="email" placeholder="E-mail" required />
              <input type="tel" placeholder="Telefone" required />
            </div>
          </div>

          <div className="form-section">
            <h3>2. Endereço de Entrega</h3>
            <div className="form-group row">
              <input type="text" placeholder="CEP" required />
              <input type="text" placeholder="Estado" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Rua / Avenida" required />
            </div>
            <div className="form-group row">
              <input type="text" placeholder="Número" required />
              <input type="text" placeholder="Complemento" />
            </div>
          </div>

          <div className="form-section">
            <h3>3. Pagamento</h3>
            <div className="payment-methods">
              <label className={`payment-method ${paymentMethod === 'credit_card' ? 'active' : ''}`}>
                <input type="radio" name="payment" checked={paymentMethod === 'credit_card'} onChange={() => setPaymentMethod('credit_card')} />
                Cartão de Crédito
              </label>
              <label className={`payment-method ${paymentMethod === 'pix' ? 'active' : ''}`}>
                <input type="radio" name="payment" checked={paymentMethod === 'pix'} onChange={() => setPaymentMethod('pix')} />
                PIX
              </label>
            </div>

            {paymentMethod === 'credit_card' && (
              <div className="payment-details credit-card-form">
                <div className="form-group">
                  <input type="text" placeholder="Número do Cartão" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Nome Impresso no Cartão" required />
                </div>
                <div className="form-group row">
                  <input type="text" placeholder="Validade (MM/AA)" required />
                  <input type="text" placeholder="CVV" required />
                </div>
              </div>
            )}

            {paymentMethod === 'pix' && (
              <div className="payment-details pix-form">
                <p>Escaneie o QR Code abaixo com o aplicativo do seu banco:</p>
                <div className="pix-qrcode">
                  {/* Fake QR CODE CSS Box */}
                  <div className="fake-qr"></div>
                </div>
                <p>Ou utilize a chave Copia e Cola:</p>
                <div className="pix-copy-paste">
                  <code>00020101021126580014br.gov.bcb.pix0136compia-editora-fake-pix-9999</code>
                  <button type="button" className="btn btn--secondary">Copiar</button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="checkout-summary">
        <h3>Resumo do Pedido</h3>
        <div className="summary-items">
          {cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.quantity}x {item.name}</span>
              <span>R$ {(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <hr />
        <div className="summary-row">
          <span>Subtotal</span>
          <span>R$ {Number(cartTotalPrice).toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Frete (Fixo Exemplo)</span>
          <span>R$ 15.90</span>
        </div>
        <div className="summary-total">
          <span>Total a Pagar</span>
          <span>R$ {Number(finalTotal).toFixed(2)}</span>
        </div>
        
        <button type="submit" form="checkout-form" className="btn checkout-btn">
          Confirmar Pagamento
        </button>
      </div>
    </div>
  );
}
