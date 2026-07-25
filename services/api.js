// Placeholder para a conexão com a REST API do WooCommerce

export async function fetchProducts() {
  return [
    { 
      id: 1, 
      name: 'Introdução à Inteligência Artificial', 
      author: 'Marcos Silva',
      price: '89.90',
      category: 'Inteligência Artificial',
      color: '#4a90e2' // Blue theme
    },
    { 
      id: 2, 
      name: 'Arquitetura de Software Inteligente', 
      author: 'Ana Clara',
      price: '120.00',
      category: 'Engenharia de Software',
      color: '#e74c3c' // Red theme
    },
    { 
      id: 3, 
      name: 'Blockchain e Criptografia', 
      author: 'João Souza',
      price: '95.50',
      category: 'Cibersegurança',
      color: '#f39c12' // Orange theme
    },
    { 
      id: 4, 
      name: 'Deep Learning Aplicado', 
      author: 'Marcos Silva',
      price: '145.00',
      category: 'Inteligência Artificial',
      color: '#8e44ad' // Purple theme
    }
  ];
}

export async function fetchCategories() {
  return ['Todos', 'Inteligência Artificial', 'Engenharia de Software', 'Cibersegurança'];
}