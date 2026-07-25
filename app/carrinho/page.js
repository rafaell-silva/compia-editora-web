import Cart from '../../components/Cart/Cart';

export const metadata = {
  title: 'Carrinho - COMPIA Editora',
};

export default function CartPage() {
  return (
    <div className="page-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '2rem', borderBottom: '2px solid var(--primary-color)', paddingBottom: '1rem' }}>
        Seu Carrinho
      </h1>
      <Cart />
    </div>
  );
}
