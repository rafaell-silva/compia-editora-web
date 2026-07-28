import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { CartProvider } from '../context/CartContext';
import { OrderProvider } from '../context/OrderContext';
import { AuthProvider } from '../context/AuthContext';
import { WishlistProvider } from '../context/WishlistContext';

export const metadata = {
  title: 'COMPIA Editora - E-commerce',
  description: 'Livros, revistas e materiais digitais de Inteligência Artificial.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <a href="#main-content" className="skip-link">Pular para o conteúdo principal</a>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <WishlistProvider>
                <Header />
                <main id="main-content" className="main-content">
                  {children}
                </main>
                <Footer />
              </WishlistProvider>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}