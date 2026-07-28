import './footer.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        <div className="footer__brand">
          <h2>COMPIA Editora</h2>
          <p>
            A ponte entre o mundo acadêmico e o mercado de trabalho.
            Conteúdos de excelência em Inteligência Artificial, Engenharia de Software e Tecnologias Emergentes.
          </p>
        </div>
        
        <nav className="footer__section" aria-label="Links úteis">
          <h3>Links Úteis</h3>
          <ul>
            <li><Link href="/">Catálogo de Livros</Link></li>
            <li><Link href="/sobre">Sobre a Editora</Link></li>
            <li><Link href="/contato">Contato</Link></li>
            <li><Link href="/autores">Seja um Autor</Link></li>
            <li><Link href="/faq">Perguntas Frequentes</Link></li>
          </ul>
        </nav>

        <div className="footer__section">
          <h3>Contato</h3>
          <ul>
            <li><a href="mailto:contato@compiaeditora.com.br">contato@compiaeditora.com.br</a></li>
            <li><a href="tel:+5511999999999">(11) 99999-9999</a></li>
            <li>São Paulo, SP - Brasil</li>
          </ul>
        </div>
      </div>
      
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} COMPIA Editora. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}