import { createContext, useContext, useState, useEffect } from "react";
import { getCartItems, addToCart, updateCartItem, DeleteCartItem } from "../Api/Api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [quantity, setQuantity] = useState(1); 



  return (
    <CartContext.Provider
      value={{ 
        quantity,
        setQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
