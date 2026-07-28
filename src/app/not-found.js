import Link from 'next/link';
import './not-found.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__title">404</h1>
        <h2 className="not-found__subtitle">Página não encontrada</h2>
        <p className="not-found__text">
          Ops! A página que você procura não existe ou foi movida.
        </p>
        <Link href="/" className="btn not-found__link">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
