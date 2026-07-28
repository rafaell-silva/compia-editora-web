import FAQList from '../../components/FAQ/FAQList';
import './faq.css';

export const metadata = {
  title: 'FAQ | COMPIA Editora',
  description: 'Perguntas frequentes sobre a COMPIA Editora.',
};

export default function FAQ() {
  return (
    <div className="faq">
      <section className="faq__hero">
        <h1>Perguntas Frequentes</h1>
        <p>Encontre respostas para as dúvidas mais comuns</p>
      </section>

      <section className="faq__content">
        <FAQList />

        <div className="faq__contact">
          <h2>Ainda tem dúvidas?</h2>
          <p>Entre em contato conosco:</p>
          <a href="mailto:contato@comperia.com.br" className="btn">
            Enviar E-mail
          </a>
        </div>
      </section>
    </div>
  );
}
