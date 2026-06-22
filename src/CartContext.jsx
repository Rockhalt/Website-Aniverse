import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    // We removed the auto-open line here!
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', '').replace(',', ''));
      return total + price;
    }, 0);
  };

  return (
    <CartContext.Provider value={{ cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);