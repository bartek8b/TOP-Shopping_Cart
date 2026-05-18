import { useState } from 'react';
import { CartContext } from './CartContext';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  function addToCart(item, quantity = 1) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem,
        );
      }

      return [...currentCart, { ...item, quantity }];
    });
  }

  function removeFromCart(id, quantity = 1) {
    setCart((currentCart) => {
      return currentCart
        .map((cartItem) => {
          if (cartItem.id === id) {
            return { ...cartItem, quantity: cartItem.quantity - quantity };
          }

          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity > 0);
    });
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
