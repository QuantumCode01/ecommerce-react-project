import { createContext, useContext, useState, useEffect, useRef } from "react";
import {
  getCartItems,
  addToCart,
  updateCartItem,
  DeleteCartItem,
} from "../Api/Api";
import { getProductsByKeywords,getUser } from "../Api/Api";
const CartContext = createContext();

export function CartProvider({ children }) {
  const [quantity, setQuantity] = useState(1);
  const [searchterm, setSearchterm] = useState("");
    const [Products, setProducts]=useState([]); 
    const [isloggedin,setloggedin]=useState(false);
    const [user,setUser]=useState('');
    const [email,setEmail]=useState('');
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
useEffect(() => {
    (async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await getUser("/auth/user"); // check your API function
        console.log(res);
        setUser(res.data.user.name);
        setEmail(res.data.user.email);
        setloggedin(true);
      } catch (error) {
        setUser(null);
        setloggedin(false);
        console.log("error", error.message || error);
      }
    })();
  }, []);

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
        isloggedin,
        setloggedin,
        user,
        setUser,
        email,
        setEmail
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
