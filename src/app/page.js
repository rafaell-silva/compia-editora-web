import Catalog from '../components/Catalog/Catalog';
import { fetchProducts, fetchCategories } from '../services/api';

export default async function Home() {
  const products = await fetchProducts();
  const categories = await fetchCategories();

  return (
    <div className="home-container">
      <section className="hero" style={{
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)',
        padding: '4rem 2rem',
        textAlign: 'center',
        marginBottom: '2rem',
        borderBottom: '1px solid #eee'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-color)' }}>Bem-vindo à COMPIA Editora</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#555' }}>
          Explore nossa seleção exclusiva de materiais bibliográficos de ponta em Inteligência Artificial, 
          Engenharia de Software, e Tecnologias Emergentes. O conhecimento do futuro, agora em suas mãos.
        </p>
      </section>

      <Catalog initialProducts={products} categories={categories} />
    </div>
  );
}