'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();
const STORAGE_KEY = 'comperia-orders';

function loadOrders() {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function generateOrderId() {
  return `CMP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`; // NOSONAR
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders);

  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    }
  }, [orders]);

  const createOrder = ({ items, shipping, paymentMethod, customerData, total }) => {
    const newOrder = {
      id: generateOrderId(),
      items,
      shipping,
      paymentMethod,
      customerData,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      statusHistory: [
        { status: 'pending', date: new Date().toISOString(), description: 'Pedido recebido' }
      ]
    };
    setOrders(prev => [...prev, newOrder]);
    return newOrder;
  };

  const getOrderById = (orderId) => {
    return orders.find(o => o.id === orderId);
  };

  const getOrdersByEmail = (email) => {
    return orders.filter(o => o.customerData?.email === email);
  };

  const updateOrderStatus = (orderId, status, description) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status,
          statusHistory: [
            ...order.statusHistory,
            { status, date: new Date().toISOString(), description }
          ]
        };
      }
      return order;
    }));
  };

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      getOrderById,
      getOrdersByEmail,
      updateOrderStatus
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);
