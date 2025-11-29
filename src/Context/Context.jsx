import { createContext, useContext, useState, useEffect, useRef } from "react";
import {
  getCartItems,
  addToCart,
  updateCartItem,
  DeleteCartItem,
} from "../Api/Api";
import { getProductsByKeywords } from "../Api/Api";
const CartContext = createContext();

export function CartProvider({ children }) {
  const [quantity, setQuantity] = useState(1);
  const [searchterm, setSearchterm] = useState("");
    const [Products, setProducts]=useState([]);
  // let timer = useRef(null);
   function handleSearch(event) {
    setSearchterm(event.target.value);
    // clearTimeout(timer.current);
  //  timer.current = setTimeout(async () => {
  //   try {

     
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, 3000);
  }
   async function getData()
{
 const data = await getProductsByKeywords(searchterm); // use captured value
       setProducts (data);
}

  return (
    <CartContext.Provider
      value={{
        quantity,
        setQuantity,
        handleSearch,
        searchterm,
        setSearchterm,
        Products,
        setProducts,
        getData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
