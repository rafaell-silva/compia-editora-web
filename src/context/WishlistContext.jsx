'use client';
import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const WishlistContext = createContext();
const STORAGE_KEY = 'comperia-wishlist';

function getInitialWishlist() {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(getInitialWishlist);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const isInWishlist = (id) => {
    return wishlistItems.some(item => item.id === id);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const value = useMemo(() => ({
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist
  }), [wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
