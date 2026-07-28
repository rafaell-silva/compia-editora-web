'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { fetchProducts } from '../../services/api';
import Link from 'next/link';
import './admin.css';

const statusLabels = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  processing: 'Preparando',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado'
};

export default function AdminPage() {
  const { user, isAdmin } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  if (!isAdmin()) {
    return (
      <div className="admin-empty">
        <h2>Acesso restrito</h2>
        <p>Apenas administradores podem acessar esta página.</p>
        <Link href="/login" className="btn">Fazer Login</Link>
      </div>
    );
  }

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus, `Status alterado para: ${statusLabels[newStatus]}`);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Painel Administrativo</h1>
        <p>Bem-vindo, {user.name}</p>
      </div>

      <div className="admin-tabs">
        <button 
          type="button"
          className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Pedidos ({orders.length})
        </button>
        <button 
          type="button"
          className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Produtos ({products.length})
        </button>
      </div>

      {activeTab === 'orders' && (
        <div className="admin-section">
          <h2>Gerenciar Pedidos</h2>
          {orders.length === 0 ? (
            <p className="admin-empty-text">Nenhum pedido encontrado.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Pedido</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td><strong>{order.id}</strong></td>
                      <td>{order.customerData?.name}<br/><small>{order.customerData?.email}</small></td>
                      <td>R$ {order.total.toFixed(2)}</td>
                      <td>
                        <span className="status-badge">{statusLabels[order.status]}</span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</td>
                      <td>
                        <select 
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="pending">Pendente</option>
                          <option value="confirmed">Confirmado</option>
                          <option value="processing">Preparando</option>
                          <option value="shipped">Enviado</option>
                          <option value="delivered">Entregue</option>
                          <option value="cancelled">Cancelado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'products' && (
        <div className="admin-section">
          <h2>Gerenciar Produtos</h2>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Produto</th>
                  <th>Categoria</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Formato</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <div className="product-cell">
                        <div className="product-color" style={{ backgroundColor: product.color }}></div>
                        <div>
                          <strong>{product.name}</strong>
                          <br/><small>{product.author}</small>
                        </div>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>R$ {product.price.toFixed(2)}</td>
                    <td>
                      <span className={`stock-badge ${product.stock < 10 ? 'low' : ''}`}>
                        {product.stock} unidades
                      </span>
                    </td>
                    <td>
                      <span className="format-badge">{product.format}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
