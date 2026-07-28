import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('starts with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.cartTotalItems).toBe(0);
    expect(result.current.cartTotalPrice).toBe(0);
  });

  test('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, name: 'Test Book', price: 50, author: 'Author' };

    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0].quantity).toBe(1);
    expect(result.current.cartTotalItems).toBe(1);
  });

  test('increments quantity when adding same item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, name: 'Test Book', price: 50, author: 'Author' };

    act(() => {
      result.current.addToCart(product);
      result.current.addToCart(product);
    });

    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
    expect(result.current.cartTotalItems).toBe(2);
    expect(result.current.cartTotalPrice).toBe(100);
  });

  test('removes item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, name: 'Test Book', price: 50, author: 'Author' };

    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.cartItems.length).toBe(1);

    act(() => {
      result.current.removeFromCart(1);
    });

    expect(result.current.cartItems.length).toBe(0);
  });

  test('updates quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, name: 'Test Book', price: 50, author: 'Author' };

    act(() => {
      result.current.addToCart(product);
    });

    act(() => {
      result.current.updateQuantity(1, 5);
    });

    expect(result.current.cartItems[0].quantity).toBe(5);
    expect(result.current.cartTotalItems).toBe(5);
    expect(result.current.cartTotalPrice).toBe(250);
  });

  test('calculates total correctly with multiple items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product1 = { id: 1, name: 'Book 1', price: 50, author: 'Author' };
    const product2 = { id: 2, name: 'Book 2', price: 30, author: 'Author' };

    act(() => {
      result.current.addToCart(product1);
      result.current.addToCart(product2);
    });

    expect(result.current.cartTotalPrice).toBe(80);
  });
});
