'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import './checkout.css';

const validators = {
  name: (v) => v.trim().length < 3 ? 'Nome deve ter pelo menos 3 caracteres' : '',
  email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'E-mail inválido' : '',
  phone: (v) => !/^\d{10,11}$/.test(v.replace(/\D/g, '')) ? 'Telefone inválido (DDD + número)' : '',
  cep: (v) => !/^\d{8}$/.test(v.replace(/\D/g, '')) ? 'CEP deve ter 8 dígitos' : '',
  state: (v) => v.trim().length < 2 ? 'Estado obrigatório' : '',
  street: (v) => v.trim().length < 3 ? 'Rua/avenida obrigatória' : '',
  number: (v) => v.trim().length < 1 ? 'Número obrigatório' : '',
  cardNumber: (v) => !/^\d{13,19}$/.test(v.replace(/\D/g, '')) ? 'Número do cartão inválido' : '',
  cardName: (v) => v.trim().length < 3 ? 'Nome obrigatório' : '',
  cardExpiry: (v) => !/^(0[1-9]|1[0-2])\/\d{2}$/.test(v) ? 'Formato inválido (MM/AA)' : '',
  cardCvv: (v) => !/^\d{3,4}$/.test(v) ? 'CVV deve ter 3 ou 4 dígitos' : '',
};

function validateField(name, value) {
  const validator = validators[name];
  return validator ? validator(value) : '';
}

export default function Checkout() {
  const { cartItems = [], cartTotalPrice = 0 } = useCart() || {};
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const finalTotal = cartTotalPrice > 0 ? Number(cartTotalPrice) + 15.90 : 0;

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newErrors = {};
    let hasError = false;

    for (const [name, validator] of Object.entries(validators)) {
      const value = formData.get(name) || '';
      const error = validator(value);
      if (error) {
        newErrors[name] = error;
        hasError = true;
      }
    }

    setErrors(newErrors);
    setTouched(Object.keys(validators).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (!hasError) {
      setIsSuccess(true);
    }
  };

  const inputClass = (name) => touched[name] && errors[name] ? 'input--error' : '';

  if (isSuccess) {
    return (
      <div className="checkout-success">
        <h2>🎉 Pedido Realizado com Sucesso!</h2>
        <p>Agradecemos por comprar na COMPIA Editora. Em breve você receberá um e-mail com os detalhes do envio.</p>
        <Link href="/" className="btn">Voltar ao Catálogo</Link>
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
              <input type="text" name="name" placeholder="Nome Completo" required className={inputClass('name')} onBlur={handleBlur} onChange={handleChange} />
              {touched.name && errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            <div className="form-group row">
              <div className="form-field">
                <input type="email" name="email" placeholder="E-mail" required className={inputClass('email')} onBlur={handleBlur} onChange={handleChange} />
                {touched.email && errors.email && <span className="form-error">{errors.email}</span>}
              </div>
              <div className="form-field">
                <input type="tel" name="phone" placeholder="Telefone" required className={inputClass('phone')} onBlur={handleBlur} onChange={handleChange} />
                {touched.phone && errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>2. Endereço de Entrega</h3>
            <div className="form-group row">
              <div className="form-field">
                <input type="text" name="cep" placeholder="CEP" required className={inputClass('cep')} onBlur={handleBlur} onChange={handleChange} />
                {touched.cep && errors.cep && <span className="form-error">{errors.cep}</span>}
              </div>
              <div className="form-field">
                <input type="text" name="state" placeholder="Estado" required className={inputClass('state')} onBlur={handleBlur} onChange={handleChange} />
                {touched.state && errors.state && <span className="form-error">{errors.state}</span>}
              </div>
            </div>
            <div className="form-group">
              <input type="text" name="street" placeholder="Rua / Avenida" required className={inputClass('street')} onBlur={handleBlur} onChange={handleChange} />
              {touched.street && errors.street && <span className="form-error">{errors.street}</span>}
            </div>
            <div className="form-group row">
              <div className="form-field">
                <input type="text" name="number" placeholder="Número" required className={inputClass('number')} onBlur={handleBlur} onChange={handleChange} />
                {touched.number && errors.number && <span className="form-error">{errors.number}</span>}
              </div>
              <input type="text" name="complement" placeholder="Complemento" />
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
                  <input type="text" name="cardNumber" placeholder="Número do Cartão" required className={inputClass('cardNumber')} onBlur={handleBlur} onChange={handleChange} />
                  {touched.cardNumber && errors.cardNumber && <span className="form-error">{errors.cardNumber}</span>}
                </div>
                <div className="form-group">
                  <input type="text" name="cardName" placeholder="Nome Impresso no Cartão" required className={inputClass('cardName')} onBlur={handleBlur} onChange={handleChange} />
                  {touched.cardName && errors.cardName && <span className="form-error">{errors.cardName}</span>}
                </div>
                <div className="form-group row">
                  <div className="form-field">
                    <input type="text" name="cardExpiry" placeholder="Validade (MM/AA)" required className={inputClass('cardExpiry')} onBlur={handleBlur} onChange={handleChange} />
                    {touched.cardExpiry && errors.cardExpiry && <span className="form-error">{errors.cardExpiry}</span>}
                  </div>
                  <div className="form-field">
                    <input type="text" name="cardCvv" placeholder="CVV" required className={inputClass('cardCvv')} onBlur={handleBlur} onChange={handleChange} />
                    {touched.cardCvv && errors.cardCvv && <span className="form-error">{errors.cardCvv}</span>}
                  </div>
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
