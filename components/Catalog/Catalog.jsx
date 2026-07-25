'use client';
import { useState } from 'react';
import ProductList from '../ProductList/ProductList';
import './catalog.css';

export default function Catalog({ initialProducts, categories }) {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredProducts = activeCategory === 'Todos' 
    ? initialProducts 
    : initialProducts.filter(p => p.category === activeCategory);

  return (
    <section className="catalog">
      <div className="catalog__filters">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`catalog__filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <ProductList products={filteredProducts} />
    </section>
  );
}
