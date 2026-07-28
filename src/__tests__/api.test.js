import '@testing-library/jest-dom';
import { fetchProducts, fetchCategories, fetchProductById, searchProducts } from '../services/api';

describe('API Service', () => {
  test('fetchProducts returns an array of products', async () => {
    const products = await fetchProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  test('each product has required fields', async () => {
    const products = await fetchProducts();
    products.forEach(product => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('author');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('color');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('stock');
      expect(product).toHaveProperty('format');
    });
  });

  test('fetchCategories returns an array of categories', async () => {
    const categories = await fetchCategories();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories).toContain('Todos');
    expect(categories).toContain('Inteligência Artificial');
  });

  test('fetchProductById returns a product when found', async () => {
    const product = await fetchProductById(1);
    expect(product).not.toBeNull();
    expect(product.id).toBe(1);
  });

  test('fetchProductById returns null when not found', async () => {
    const product = await fetchProductById(999);
    expect(product).toBeNull();
  });

  test('searchProducts filters by name', async () => {
    const results = await searchProducts('Python');
    expect(results.length).toBeGreaterThan(0);
    results.forEach(product => {
      const matchesName = product.name.toLowerCase().includes('python');
      const matchesAuthor = product.author.toLowerCase().includes('python');
      const matchesCategory = product.category.toLowerCase().includes('python');
      const matchesTags = product.tags.some(t => t.includes('python'));
      expect(matchesName || matchesAuthor || matchesCategory || matchesTags).toBe(true);
    });
  });
});
