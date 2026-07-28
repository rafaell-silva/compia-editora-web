// Mock de dados - Pronto para migração para WooCommerce REST API
// Para conectar ao backend real, substitua as funções abaixo por chamadas fetch à API

const PRODUCTS = [
  {
    id: 1,
    name: 'Introdução à Inteligência Artificial',
    author: 'Marcos Silva',
    price: 89.90,
    category: 'Inteligência Artificial',
    color: '#4a90e2',
    description: 'Um guia completo para iniciantes em IA. Este livro cobre desde conceitos básicos até algoritmos fundamentais como redes neurais, árvores de decisão e aprendizado por reforço. Ideal para estudantes e profissionais que desejam entrar no campo da inteligência artificial.',
    stock: 25,
    format: 'fisico',
    pages: 320,
    isbn: '978-65-0001-001-2',
    publisher: 'COMPIA Editora',
    year: 2024,
    tags: ['ia', 'machine-learning', 'iniciante']
  },
  {
    id: 2,
    name: 'Arquitetura de Software Inteligente',
    author: 'Ana Clara',
    price: 120.00,
    category: 'Engenharia de Software',
    color: '#e74c3c',
    description: 'Explore padrões arquiteturais modernos para sistemas inteligentes. Aprenda a projetar software escalável, resiliente e preparado para integração com modelos de IA. Inclui estudos de caso reais de empresas como Google, Netflix e Uber.',
    stock: 18,
    format: 'fisico',
    pages: 450,
    isbn: '978-65-0001-002-9',
    publisher: 'COMPIA Editora',
    year: 2024,
    tags: ['arquitetura', 'microsserviços', 'design-patterns']
  },
  {
    id: 3,
    name: 'Blockchain e Criptografia',
    author: 'João Souza',
    price: 95.50,
    category: 'Cibersegurança',
    color: '#f39c12',
    description: 'Desvende os mistérios por trás da tecnologia blockchain e da criptografia moderna. Desde fundamentals de hashes e chaves até smart contracts e DeFi. Um livro essencial para quem quer entender a fundo a segurança no mundo digital.',
    stock: 30,
    format: 'fisico',
    pages: 280,
    isbn: '978-65-0001-003-6',
    publisher: 'COMPIA Editora',
    year: 2023,
    tags: ['blockchain', 'criptografia', 'web3']
  },
  {
    id: 4,
    name: 'Deep Learning Aplicado',
    author: 'Marcos Silva',
    price: 145.00,
    category: 'Inteligência Artificial',
    color: '#8e44ad',
    description: 'Mergulhe profundamente em redes neurais artificiais. Do Perceptron simples até Transformers e modelos de linguagem como GPT. Inclui exercícios práticos com Python, TensorFlow e PyTorch. Perfeito para quem já tem conhecimentos básicos de programação.',
    stock: 12,
    format: 'fisico',
    pages: 520,
    isbn: '978-65-0001-004-3',
    publisher: 'COMPIA Editora',
    year: 2024,
    tags: ['deep-learning', 'redes-neurais', 'python']
  },
  {
    id: 5,
    name: 'Padrões de Projeto em Sistemas Distribuídos',
    author: 'Laura Mendes',
    price: 110.00,
    category: 'Engenharia de Software',
    color: '#27ae60',
    description: 'Domine os padrões de projeto essenciais para sistemas distribuídos em escala. Microservices, Event Sourcing, CQRS, Saga Pattern e muito mais. Com exemplos em Java, Go e Node.js.',
    stock: 22,
    format: 'fisico',
    pages: 380,
    isbn: '978-65-0001-005-0',
    publisher: 'COMPIA Editora',
    year: 2023,
    tags: ['padrões', 'distribuídos', 'microservices']
  },
  {
    id: 6,
    name: 'Ética na Inteligência Artificial',
    author: 'Carlos Amaral',
    price: 79.90,
    category: 'Inteligência Artificial',
    color: '#34495e',
    description: 'Uma reflexão essencial sobre os impactos sociais e éticos da IA. Vieses algorítmicos, privacidade de dados, responsabilidade civil e o futuro do trabalho. Lectura obrigatória para desenvolvedores e gestores de tecnologia.',
    stock: 35,
    format: 'fisico',
    pages: 240,
    isbn: '978-65-0001-006-7',
    publisher: 'COMPIA Editora',
    year: 2024,
    tags: ['ética', 'ia', 'sociedade']
  },
  {
    id: 7,
    name: 'Testes de Invasão Profissionais',
    author: 'Fernanda Lima',
    price: 135.00,
    category: 'Cibersegurança',
    color: '#c0392b',
    description: 'Aprenda técnicas avançadas de penetration testing utilizadas por profissionais de segurança. Reconhecimento, exploração de vulnerabilidades, pivotamento e relatórios. Inclui laboratórios práticos com Kali Linux e Metasploit.',
    stock: 15,
    format: 'fisico',
    pages: 400,
    isbn: '978-65-0001-007-4',
    publisher: 'COMPIA Editora',
    year: 2024,
    tags: ['pentest', 'segurança', 'hacking']
  },
  {
    id: 8,
    name: 'Cloud Computing Moderno',
    author: 'Ricardo Gomes',
    price: 105.00,
    category: 'Engenharia de Software',
    color: '#2980b9',
    description: 'Domine as principais plataformas cloud: AWS, Azure e Google Cloud. Desde containers Docker e Kubernetes até serverless e DevOps. Guia prático para arquitetos e desenvolvedores que querem escalar aplicações na nuvem.',
    stock: 28,
    format: 'fisico',
    pages: 360,
    isbn: '978-65-0001-008-1',
    publisher: 'COMPIA Editora',
    year: 2023,
    tags: ['cloud', 'aws', 'docker', 'kubernetes']
  },
  {
    id: 9,
    name: 'Python para Ciência de Dados',
    author: 'Ana Clara',
    price: 89.90,
    category: 'Inteligência Artificial',
    color: '#1abc9c',
    description: 'Do básico ao avançado: NumPy, Pandas, Matplotlib, Scikit-learn e TensorFlow. Aprenda a analisar dados, criar visualizações e construir modelos preditivos. Ideal para cientistas de dados em formação.',
    stock: 40,
    format: 'ebook',
    pages: 300,
    isbn: '978-65-0001-009-8',
    publisher: 'COMPIA Editora',
    year: 2024,
    tags: ['python', 'dados', 'data-science']
  },
  {
    id: 10,
    name: 'DevOps: Práticas e Ferramentas',
    author: 'Ricardo Gomes',
    price: 75.00,
    category: 'Engenharia de Software',
    color: '#9b59b6',
    description: 'Transforme seu fluxo de trabalho com práticas DevOps. CI/CD, infraestrutura como código, monitoramento e cultura organizacional. Com exemplos usando GitHub Actions, Terraform e Prometheus.',
    stock: 50,
    format: 'ebook',
    pages: 280,
    isbn: '978-65-0001-010-4',
    publisher: 'COMPIA Editora',
    year: 2024,
    tags: ['devops', 'ci-cd', 'terraform']
  },
  {
    id: 11,
    name: 'Kit Completo: IA & Machine Learning',
    author: 'Vários Autores',
    price: 299.90,
    category: 'Inteligência Artificial',
    color: '#e67e22',
    description: 'Pacote exclusivo com 3 livros: Introdução à IA, Deep Learning Aplicado e Python para Ciência de Dados. Economize mais de R$100 e tenha um conhecimento completo em IA.',
    stock: 10,
    format: 'kit',
    pages: 1120,
    isbn: '978-65-0001-011-1',
    publisher: 'COMPIA Editora',
    year: 2024,
    tags: ['kit', 'ia', 'promoção']
  }
];

const CATEGORIES = ['Todos', 'Inteligência Artificial', 'Engenharia de Software', 'Cibersegurança'];

const AUTHORS = [
  { id: 1, name: 'Marcos Silva', bio: 'Especialista em IA e Deep Learning, com mais de 15 anos de experiência em machine learning aplicado.', books: [1, 4] },
  { id: 2, name: 'Ana Clara', bio: 'Arquiteta de software e consultora em cloud computing. Trabalhou em grandes empresas de tecnologia.', books: [2, 9] },
  { id: 3, name: 'João Souza', bio: 'Especialista em segurança da informação e blockchain. Certificações CEH e OSCP.', books: [3] },
  { id: 4, name: 'Laura Mendes', bio: 'Engenheira de software sênior, especialista em sistemas distribuídos e microsserviços.', books: [5] },
  { id: 5, name: 'Carlos Amaral', bio: 'Pesquisador em ética digital e professor universitário. Autor de vários artigos sobre impacto social da IA.', books: [6] },
  { id: 6, name: 'Fernanda Lima', bio: 'Pentester profissional e consultora de segurança. Trabalha com testes de invasão há mais de 10 anos.', books: [7] },
  { id: 7, name: 'Ricardo Gomes', bio: 'Arquiteto cloud e DevOps. Ex-engenheiro da AWS e Google Cloud.', books: [8, 10] }
];

// Simula delay de rede
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchProducts() {
  await delay(100);
  return PRODUCTS;
}

export async function fetchProductById(id) {
  await delay(50);
  return PRODUCTS.find(p => p.id === Number(id)) || null;
}

export async function fetchCategories() {
  await delay(50);
  return CATEGORIES;
}

export async function fetchProductsByCategory(category) {
  await delay(100);
  if (category === 'Todos') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

export async function fetchAuthors() {
  await delay(50);
  return AUTHORS;
}

export async function fetchAuthorById(id) {
  await delay(50);
  return AUTHORS.find(a => a.id === Number(id)) || null;
}

export async function searchProducts(query) {
  await delay(100);
  const lower = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(lower) ||
    p.author.toLowerCase().includes(lower) ||
    p.category.toLowerCase().includes(lower) ||
    p.tags.some(t => t.includes(lower))
  );
}

export async function updateStock(productId, quantityChange) {
  await delay(50);
  const product = PRODUCTS.find(p => p.id === productId);
  if (product) {
    product.stock = Math.max(0, product.stock + quantityChange);
  }
  return product;
}
