import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { openWhatsAppWithCart } from "../utils/whatsapp";

const CartContext = createContext(null);

const STORAGE_KEY = "fantech_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (saved) setItems(JSON.parse(saved));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      }
    } catch (e) {}
  }, [items]);

  const totalItems = useMemo(() => items.reduce((a, it) => a + it.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((a, it) => a + it.price * it.quantity, 0), [items]);

  const addToCart = (product, quantity = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.slug === product.slug);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: Math.min(99, next[idx].quantity + quantity) };
        return next;
      }
      return [...prev, { id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image, quantity }];
    });
  };

  const updateQuantity = (slug, quantity) => {
    setItems(prev => prev.map(p => p.slug === slug ? { ...p, quantity: Math.min(99, Math.max(1, quantity)) } : p));
  };

  const removeFromCart = (slug) => {
    setItems(prev => prev.filter(p => p.slug !== slug));
  };

  const clearCart = () => setItems([]);

  const checkoutWhatsApp = (phoneNumber = "") => {
    const envPhone = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER : "";
    const targetPhone = (phoneNumber && phoneNumber.trim()) || (envPhone && envPhone.trim()) || "";
    openWhatsAppWithCart(items, totalPrice, targetPhone);
  };

  const value = {
    items,
    totalItems,
    totalPrice,
    isOpen,
    setIsOpen,
    toggleCart: () => setIsOpen(v => !v),
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    checkoutWhatsApp,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
