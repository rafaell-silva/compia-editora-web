'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import QRCode from '../QRCode/QRCode';
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

function generatePixKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length)); // NOSONAR
  }
  return result;
}

function getCardBrand(number) {
  const cleaned = number.replace(/\D/g, '');
  if (/^4/.test(cleaned)) return 'Visa';
  if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) return 'MasterCard';
  if (/^4011|^4312|^4389/.test(cleaned)) return 'Elo';
  if (/^3[47]/.test(cleaned)) return 'American Express';
  if (/^6(?:011|5)/.test(cleaned)) return 'Discover';
  return null;
}

export default function Checkout() {
  const { cartItems = [], cartSubtotal = 0, cartShipping = 0, cartTotalPrice = 0, clearCart } = useCart() || {};
  const { createOrder } = useOrders() || {};
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [copiedPix, setCopiedPix] = useState(false);
  const [cardBrand, setCardBrand] = useState(null);

  const pixKey = generatePixKey();
  const pixCode = `00020101021126580014br.gov.bcb.pix0136${pixKey}5204000053039865404${cartTotalPrice.toFixed(2)}5802BR5913COMPIA EDITORA6009SAO PAULO62070503***6304`;

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
    if (name === 'cardNumber') {
      setCardBrand(getCardBrand(value));
    }
  };

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = pixCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 2000);
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newErrors = {};
    let hasError = false;

    const fieldsToValidate = paymentMethod === 'credit_card'
      ? Object.keys(validators)
      : Object.keys(validators).filter(k => !k.startsWith('card'));

    for (const name of fieldsToValidate) {
      const validator = validators[name];
      if (validator) {
        const value = formData.get(name) || '';
        const error = validator(value);
        if (error) {
          newErrors[name] = error;
          hasError = true;
        }
      }
    }

    setErrors(newErrors);
    setTouched(fieldsToValidate.reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (!hasError) {
      const customerData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: {
          cep: formData.get('cep'),
          state: formData.get('state'),
          street: formData.get('street'),
          number: formData.get('number'),
          complement: formData.get('complement')
        }
      };

      const order = createOrder({
        items: cartItems,
        shipping: { method: 'Correios PAC', price: cartShipping },
        paymentMethod,
        customerData,
        total: cartTotalPrice
      });

      setOrderId(order.id);
      clearCart();
      setIsSuccess(true);
    }
  };

  const inputClass = (name) => touched[name] && errors[name] ? 'input--error' : '';

  if (isSuccess) {
    return (
      <div className="checkout-success">
        <h2>Pedido Realizado com Sucesso!</h2>
        <p className="checkout-success__order-id">Pedido: <strong>{orderId}</strong></p>
        <p>Agradecemos por comprar na COMPIA Editora. Em breve você receberá um e-mail com os detalhes do envio.</p>
        <div className="checkout-success__actions">
          <Link href="/" className="btn">Voltar ao Catálogo</Link>
          <Link href="/pedidos" className="btn btn--secondary">Meus Pedidos</Link>
        </div>
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
                {cardBrand && <span className="card-brand">{cardBrand}</span>}
                <div className="form-group">
                  <input type="text" name="cardNumber" placeholder="Número do Cartão" required className={inputClass('cardNumber')} onBlur={handleBlur} onChange={handleChange} maxLength="19" />
                  {touched.cardNumber && errors.cardNumber && <span className="form-error">{errors.cardNumber}</span>}
                </div>
                <div className="form-group">
                  <input type="text" name="cardName" placeholder="Nome Impresso no Cartão" required className={inputClass('cardName')} onBlur={handleBlur} onChange={handleChange} />
                  {touched.cardName && errors.cardName && <span className="form-error">{errors.cardName}</span>}
                </div>
                <div className="form-group row">
                  <div className="form-field">
                    <input type="text" name="cardExpiry" placeholder="Validade (MM/AA)" required className={inputClass('cardExpiry')} onBlur={handleBlur} onChange={handleChange} maxLength="5" />
                    {touched.cardExpiry && errors.cardExpiry && <span className="form-error">{errors.cardExpiry}</span>}
                  </div>
                  <div className="form-field">
                    <input type="text" name="cardCvv" placeholder="CVV" required className={inputClass('cardCvv')} onBlur={handleBlur} onChange={handleChange} maxLength="4" />
                    {touched.cardCvv && errors.cardCvv && <span className="form-error">{errors.cardCvv}</span>}
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'pix' && (
              <div className="payment-details pix-form">
                <p>Escaneie o QR Code abaixo com o aplicativo do seu banco:</p>
                <div className="pix-qrcode">
                  <QRCode value={pixCode} size={200} />
                </div>
                <p>Ou utilize a chave Copia e Cola:</p>
                <div className="pix-copy-paste">
                  <code className="pix-key">{pixCode}</code>
                  <button type="button" className="btn btn--secondary" onClick={handleCopyPix}>
                    {copiedPix ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
                <p className="pix-info">O pagamento será confirmado automaticamente em até 10 minutos.</p>
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
          <span>R$ {Number(cartSubtotal).toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Frete</span>
          <span>{cartShipping === 0 ? 'Grátis' : `R$ ${Number(cartShipping).toFixed(2)}`}</span>
        </div>
        <div className="summary-total">
          <span>Total a Pagar</span>
          <span>R$ {Number(cartTotalPrice).toFixed(2)}</span>
        </div>
        
        <button type="submit" form="checkout-form" className="btn checkout-btn">
          Confirmar Pagamento
        </button>
      </div>
    </div>
  );
}
