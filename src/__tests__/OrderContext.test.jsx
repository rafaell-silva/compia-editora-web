import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { OrderProvider, useOrders } from '../context/OrderContext';

const wrapper = ({ children }) => <OrderProvider>{children}</OrderProvider>;

describe('OrderContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('starts with no orders', () => {
    const { result } = renderHook(() => useOrders(), { wrapper });
    expect(result.current.orders).toEqual([]);
  });

  test('creates a new order', () => {
    const { result } = renderHook(() => useOrders(), { wrapper });

    let order;
    act(() => {
      order = result.current.createOrder({
        items: [{ id: 1, name: 'Book', price: 50, quantity: 1 }],
        shipping: { method: 'PAC', price: 15.90 },
        paymentMethod: 'credit_card',
        customerData: { name: 'Test', email: 'test@email.com' },
        total: 65.90
      });
    });

    expect(order).toHaveProperty('id');
    expect(order.status).toBe('pending');
    expect(result.current.orders).toHaveLength(1);
  });

  test('retrieves order by id', () => {
    const { result } = renderHook(() => useOrders(), { wrapper });

    let order;
    act(() => {
      order = result.current.createOrder({
        items: [],
        shipping: {},
        paymentMethod: 'pix',
        customerData: { name: 'Test', email: 'test@email.com' },
        total: 100
      });
    });

    const found = result.current.getOrderById(order.id);
    expect(found).not.toBeNull();
    expect(found.id).toBe(order.id);
  });

  test('retrieves orders by email', () => {
    const { result } = renderHook(() => useOrders(), { wrapper });

    act(() => {
      result.current.createOrder({
        items: [],
        shipping: {},
        paymentMethod: 'pix',
        customerData: { name: 'Test', email: 'test@email.com' },
        total: 100
      });
      result.current.createOrder({
        items: [],
        shipping: {},
        paymentMethod: 'credit_card',
        customerData: { name: 'Other', email: 'other@email.com' },
        total: 50
      });
    });

    const found = result.current.getOrdersByEmail('test@email.com');
    expect(found).toHaveLength(1);
    expect(found[0].customerData.email).toBe('test@email.com');
  });

  test('updates order status', () => {
    const { result } = renderHook(() => useOrders(), { wrapper });

    let order;
    act(() => {
      order = result.current.createOrder({
        items: [],
        shipping: {},
        paymentMethod: 'pix',
        customerData: { name: 'Test', email: 'test@email.com' },
        total: 100
      });
    });

    act(() => {
      result.current.updateOrderStatus(order.id, 'confirmed', 'Pedido confirmado');
    });

    const updated = result.current.getOrderById(order.id);
    expect(updated.status).toBe('confirmed');
    expect(updated.statusHistory).toHaveLength(2);
  });
});
