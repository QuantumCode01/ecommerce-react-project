import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";

// Pages & Components
import HomePage from "./Pages/HomePage";
import CheckoutPage from "./Pages/CheckoutPage";
import CartPage from "./Pages/CartPage";
import OrdersPage from "./Pages/OrdersPage";
import PageNotFound from "./Pages/PageNotFound";
import Tracking from "./Pages/Tracking";
import Login from "./Pages/Login";
import Header from "./Components/HeaderDetails/Header";
import Protected from "./Pages/Protected";

// Context
import { CartProvider, useCart } from "./Context/Context";

// API
import { getCartItems } from "./Api/Api";
import Profile from "./Pages/Profile";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </CartProvider>
  );
}

function MainApp() {
  // Now context works because this component is INSIDE CartProvider
  const { isloggedin, setloggedin } = useCart();

  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);

  // Fetch Cart
  async function fetchCartItem() {
    const data = await getCartItems();
    setCart(data);

    const total = data.reduce((sum, item) => sum + item.quantity, 0);
    setCount(total);
  }

  // On App Load
  useEffect(() => {
    fetchCartItem();

    const token = localStorage.getItem("accessToken");
    if (token) {
      setloggedin(true); // Keep user logged in on refresh
    }
  }, []);

  return (
    <>
      <Header cartCount={count} />

      <Routes>
        <Route element={<Protected/>}>
            <Route path="/" element={<HomePage fetchCart={fetchCartItem} />} />
            <Route path="/order" element={<OrdersPage fetchCart={fetchCartItem} />} />
             <Route path="/checkout" element={<CheckoutPage cart={cart} fetchCart={fetchCartItem} />} />
             <Route path="/profile" element={<Profile/>}/>
        </Route>
        
       
        <Route path="/cart" element={<CartPage />} />
       
        <Route path="/track/:orderId/:productId" element={<Tracking fetchCart={fetchCartItem} />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
