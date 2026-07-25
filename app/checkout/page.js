import Checkout from '../../components/Checkout/Checkout';

export const metadata = {
  title: 'Finalizar Compra - COMPIA Editora',
};

export default function CheckoutPage() {
  return (
    <div className="page-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '2rem', borderBottom: '2px solid var(--primary-color)', paddingBottom: '1rem' }}>
        Finalizar Compra
      </h1>
      <Checkout />
    </div>
  );
}
