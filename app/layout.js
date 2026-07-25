import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { CartProvider } from '../context/CartContext';

export const metadata = {
  title: 'COMPIA Editora - E-commerce',
  description: 'Livros, revistas e materiais digitais de Inteligência Artificial.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <Header />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}