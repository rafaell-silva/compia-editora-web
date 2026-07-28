'use client';
import { useState } from 'react';
import './contato.css';

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Assunto é obrigatório';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <div className="contato-page">
      <h1>Entre em Contato</h1>
      
      {submitSuccess && (
        <div className="contato-success">
          Mensagem enviada com sucesso! Entraremos em contato em breve.
        </div>
      )}
      
      <form className="contato-form" onSubmit={handleSubmit}>
        <div className="contato-form__group">
          <label htmlFor="name" className="contato-form__label">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`contato-form__input ${errors.name ? 'error' : ''}`}
            placeholder="Seu nome completo"
          />
          {errors.name && <span className="contato-form__error">{errors.name}</span>}
        </div>
        
        <div className="contato-form__group">
          <label htmlFor="email" className="contato-form__label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`contato-form__input ${errors.email ? 'error' : ''}`}
            placeholder="seu@email.com"
          />
          {errors.email && <span className="contato-form__error">{errors.email}</span>}
        </div>
        
        <div className="contato-form__group">
          <label htmlFor="subject" className="contato-form__label">Assunto</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`contato-form__input ${errors.subject ? 'error' : ''}`}
            placeholder="Assunto da mensagem"
          />
          {errors.subject && <span className="contato-form__error">{errors.subject}</span>}
        </div>
        
        <div className="contato-form__group">
          <label htmlFor="message" className="contato-form__label">Mensagem</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`contato-form__textarea ${errors.message ? 'error' : ''}`}
            placeholder="Escreva sua mensagem aqui..."
            rows="5"
          />
          {errors.message && <span className="contato-form__error">{errors.message}</span>}
        </div>
        
        <button 
          type="submit" 
          className="btn contato-form__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </form>
    </div>
  );
}
