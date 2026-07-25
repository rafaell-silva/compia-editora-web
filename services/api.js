// Placeholder para a conexão com a REST API do WooCommerce
// URL base da API e Keys deverão ser configuradas no .env.local

const WC_API_URL = process.env.NEXT_PUBLIC_WC_API_URL || 'https://sua-loja-wp.com/wp-json/wc/v3';
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

export async function fetchProducts() {
  // Retorno mockado temporariamente até a integração
  return [
    { id: 1, name: 'Introdução à Inteligência Artificial', price: '89.90' },
    { id: 2, name: 'Arquitetura de Software Inteligente', price: '120.00' },
    { id: 3, name: 'Blockchain e Criptografia', price: '95.50' }
  ];
}