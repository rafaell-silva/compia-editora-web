'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import { fetchProducts } from '../../../services/api';
import './product-detail.css';

export default function ProductDetail({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();

  const products = fetchProducts();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="product-detail-not-found">
        <h2>Produto não encontrado</h2>
        <button type="button" className="btn" onClick={() => router.push('/')}>
          Voltar ao catálogo
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    router.push('/carrinho');
  };

  return (
    <div className="product-detail">
      <button type="button" className="product-detail__back" onClick={() => router.back()}>
        &larr; Voltar
      </button>

      <div className="product-detail__layout">
        <div className="product-detail__image">
          <div className="book-cover book-cover--large" style={{ '--book-color': product.color }}>
            <div className="book-cover__spine"></div>
            <div className="book-cover__front">
              <span className="book-cover__author">{product.author}</span>
              <h3 className="book-cover__title">{product.name}</h3>
              <div className="book-cover__publisher">COMPIA</div>
            </div>
          </div>
        </div>

        <div className="product-detail__info">
          <span className="product-detail__category">{product.category}</span>
          <h1 className="product-detail__title">{product.name}</h1>
          <p className="product-detail__author">por {product.author}</p>
          <p className="product-detail__price">R$ {product.price.toFixed(2)}</p>

          <div className="product-detail__description">
            <h3>Sobre o livro</h3>
            <p>
              Este livro é uma obra essencial para quem deseja aprofundar seus conhecimentos
              na área de {product.category}. Com uma abordagem prática e acessível, o autor
              {product.author} guia o leitor através dos conceitos fundamentais e avançados,
              preparando-o para os desafios do mercado de trabalho.
            </p>
          </div>

          <div className="product-detail__actions">
            <button type="button" className="btn product-detail__add-btn" onClick={handleAddToCart}>
              Adicionar ao Carrinho
            </button>
          </div>

          <div className="product-detail__meta">
            <div className="meta-item">
              <strong>Formato:</strong> Livro Físico + E-book
            </div>
            <div className="meta-item">
              <strong>Entrega:</strong> 3-7 dias úteis
            </div>
            <div className="meta-item">
              <strong>Garantia:</strong> 7 dias
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
