import ProductList from '../components/ProductList/ProductList';
import { fetchProducts } from '../services/api';

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="page-container" style={{padding: '2rem'}}>
      <h1 style={{color: 'var(--primary-color)', marginBottom: '1.5rem'}}>Destaques da Editora</h1>
      <ProductList products={products} />
    </div>
  );
}