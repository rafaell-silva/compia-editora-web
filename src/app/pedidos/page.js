'use client';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import './pedidos.css';

const statusLabels = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  processing: 'Preparando',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado'
};

const statusColors = {
  pending: '#f39c12',
  confirmed: '#3498db',
  processing: '#9b59b6',
  shipped: '#2ecc71',
  delivered: '#27ae60',
  cancelled: '#e74c3c'
};

export default function PedidosPage() {
  const { getOrdersByEmail } = useOrders();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return (
      <div className="pedidos-empty">
        <h2>Faça login para ver seus pedidos</h2>
        <Link href="/login" className="btn">Entrar</Link>
      </div>
    );
  }

  const orders = getOrdersByEmail(user.email);

  if (orders.length === 0) {
    return (
      <div className="pedidos-empty">
        <h2>Você ainda não fez nenhum pedido</h2>
        <p>Explore nosso catálogo e encontre livros incríveis!</p>
        <Link href="/" className="btn">Ver Catálogo</Link>
      </div>
    );
  }

  return (
    <div className="pedidos-page">
      <h1>Meus Pedidos</h1>
      
      <div className="pedidos-list">
        {orders.map(order => (
          <div key={order.id} className="pedido-card">
            <div className="pedido-header">
              <div>
                <span className="pedido-id">{order.id}</span>
                <span className="pedido-date">
                  {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <span 
                className="pedido-status"
                style={{ backgroundColor: statusColors[order.status] }}
              >
                {statusLabels[order.status]}
              </span>
            </div>

            <div className="pedido-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="pedido-item">
                  <span>{item.quantity}x {item.name}</span>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pedido-footer">
              <div className="pedido-total">
                <span>Total:</span>
                <span>R$ {order.total.toFixed(2)}</span>
              </div>
              <div className="pedido-payment">
                Pagamento: {order.paymentMethod === 'credit_card' ? 'Cartão de Crédito' : 'PIX'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
