'use client';
import { useState } from 'react';
import ProductList from '../ProductList/ProductList';
import './catalog.css';

export default function Catalog({ initialProducts, categories }) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = initialProducts.filter(product => {
    const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="catalog">
      <div className="catalog__search">
        <input
          type="text"
          placeholder="Buscar por título, autor ou tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="catalog__search-input"
          aria-label="Buscar produtos"
        />
      </div>
      
      <div className="catalog__filters">
        {categories.map(cat => (
          <button 
            key={cat} 
            type="button"
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
