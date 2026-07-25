import './productList.css';

export default function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <article key={product.id} className="product-card">
          <div className="product-card__image-placeholder" style={{height: '200px', backgroundColor: '#eee', marginBottom: '1rem'}}>
             {/* Placeholder para imagem do WooCommerce */}
          </div>
          <h2 className="product-card__title">{product.name}</h2>
          <p className="product-card__price">R$ {product.price}</p>
          <button className="btn product-card__btn">Adicionar ao Carrinho</button>
        </article>
      ))}
    </div>
  );
}