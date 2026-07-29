'use client';
import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext();
const STORAGE_KEY = 'comperia-cart';
const SHIPPING_KEY = 'comperia-shipping';

function getInitialCart() {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function getInitialShipping() {
  if (typeof window === 'undefined') return { option: null, price: 0 };
  try {
    const stored = localStorage.getItem(SHIPPING_KEY);
    return stored ? JSON.parse(stored) : { option: null, price: 0 };
  } catch {
    return { option: null, price: 0 };
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getInitialCart);
  const [selectedShipping, setSelectedShipping] = useState(getInitialShipping);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(SHIPPING_KEY, JSON.stringify(selectedShipping));
  }, [selectedShipping]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.some(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const clearCart = () => {
    setCartItems([]);
    setSelectedShipping({ option: null, price: 0 });
  };

  const updateShipping = (option, price) => {
    setSelectedShipping({ option, price });
  };

  const cartTotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartShipping = selectedShipping.price;
  const cartTotalPrice = cartSubtotal + cartShipping;

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    selectedShipping,
    updateShipping,
    cartTotalItems,
    cartSubtotal,
    cartShipping,
    cartTotalPrice
  }), [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, selectedShipping, updateShipping, cartTotalItems, cartSubtotal, cartShipping, cartTotalPrice]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
