import { useState } from 'react'
import './App.css'
import HomePage from './Pages/HomePage'
import { BrowserRouter, Routes, Route } from "react-router";
import CheckoutPage from './Pages/CheckoutPage';
import CartPage from './Pages/CartPage';
import OrdersPage from './Pages/OrdersPage';
import Header from './Components/HeaderDetails/Header';
import PageNotFound from './Pages/PageNotFound';
import { CartProvider } from './Context/Context';
import Tracking from './Pages/Tracking';

import { getCartItems } from './Api/Api';
import { useEffect } from 'react';
function App() {
      const [count, setCount]=useState(0);
     const[cart,setCart]=useState([]);
      async function fetchCartItem(){
        const data= await getCartItems();
        let cart=data;
        setCart(cart)
       let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCount(totalQuantity);
      
      }
      useEffect(()=>{
        fetchCartItem();
      },[]);

  return (
    <>
    <BrowserRouter>
     <CartProvider>
      <Header cartCount={count}/>
        <Routes>
          <Route path="/" element={<HomePage fetchCart={fetchCartItem}/>} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} fetchCart={fetchCartItem} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrdersPage fetchCart={fetchCartItem}/>} />
          <Route path="/track/:orderId/:productId" element={<Tracking fetchCart={fetchCartItem}/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  )
}

export default App
