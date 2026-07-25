// Placeholder para a conexão com a REST API do WooCommerce

export async function fetchProducts() {
  return [
    { id: 1, name: 'Introdução à Inteligência Artificial', author: 'Marcos Silva', price: 89.90, category: 'Inteligência Artificial', color: '#4a90e2' },
    { id: 2, name: 'Arquitetura de Software Inteligente', author: 'Ana Clara', price: 120.00, category: 'Engenharia de Software', color: '#e74c3c' },
    { id: 3, name: 'Blockchain e Criptografia', author: 'João Souza', price: 95.50, category: 'Cibersegurança', color: '#f39c12' },
    { id: 4, name: 'Deep Learning Aplicado', author: 'Marcos Silva', price: 145.00, category: 'Inteligência Artificial', color: '#8e44ad' },
    { id: 5, name: 'Padrões de Projeto em Sistemas Distribuídos', author: 'Laura Mendes', price: 110.00, category: 'Engenharia de Software', color: '#27ae60' },
    { id: 6, name: 'Ética na Inteligência Artificial', author: 'Carlos Amaral', price: 79.90, category: 'Inteligência Artificial', color: '#34495e' },
    { id: 7, name: 'Testes de Invasão Profissionais', author: 'Fernanda Lima', price: 135.00, category: 'Cibersegurança', color: '#c0392b' },
    { id: 8, name: 'Cloud Computing Moderno', author: 'Ricardo Gomes', price: 105.00, category: 'Engenharia de Software', color: '#2980b9' }
  ];
}

export async function fetchCategories() {
  return ['Todos', 'Inteligência Artificial', 'Engenharia de Software', 'Cibersegurança'];
}