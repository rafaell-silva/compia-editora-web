import './header.css';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <Link 
          href="/" 
          className="header__logo-link">
            <h1>COMPIA Editora</h1>
        </Link>
      </div>
      <nav className="header__nav">
        <ul>
          <li><Link href="/" className="header__nav-link">Início</Link></li>
          <li><Link href="/livros" className="header__nav-link">Livros</Link></li>
          <li><Link href="/carrinho" className="header__nav-link">Carrinho</Link></li>
        </ul>
      </nav>
    </header>
  );
}