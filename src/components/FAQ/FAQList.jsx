'use client';
import { useState } from 'react';

const faqData = [
  {
    question: 'Como faço para comprar um livro?',
    answer: 'É simples! Navegue pelo nosso catálogo, selecione o livro desejado e clique em "Adicionar ao Carrinho". Depois, finalize a compra seguindo os passos do checkout.'
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos cartões de crédito (Visa, MasterCard, Elo) e PIX. Todas as transações são seguras e criptografadas.'
  },
  {
    question: 'Como funciona a entrega de livros físicos?',
    answer: 'Utilizamos os Correios (PAC e Sedex) para entregas em todo o Brasil. O prazo varia de 2 a 10 dias úteis, dependendo da modalidade escolhida.'
  },
  {
    question: 'E os livros digitais (e-books)?',
    answer: 'Após a confirmação do pagamento, você receberá um e-mail com o link para download do e-book. O acesso é imediato e vitalício.'
  },
  {
    question: 'Posso trocar ou devolver um livro?',
    answer: 'Sim! Oferecemos garantia de 7 dias para troca ou devolução. Entre em contato conosco pelo e-mail suporte@comperia.com.br.'
  },
  {
    question: 'Vocês publicam livros de outros autores?',
    answer: 'Sim! Estamos sempre abertos a propostas de autores que compartilham nossa visão de democratizar o conhecimento em tecnologia.'
  },
  {
    question: 'Como entro em contato com a editora?',
    answer: 'Você pode nos enviar um e-mail para contato@comperia.com.br ou usar nosso formulário de contato na página de contato.'
  }
];

export default function FAQList() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq__list">
      {faqData.map((item, index) => (
        <div 
          key={index} 
          className={`faq__item ${openIndex === index ? 'faq__item--open' : ''}`}
        >
          <button 
            type="button"
            className="faq__question"
            onClick={() => toggleFAQ(index)}
            aria-expanded={openIndex === index}
          >
            <span>{item.question}</span>
            <span className="faq__icon">{openIndex === index ? '−' : '+'}</span>
          </button>
          <div className="faq__answer">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
