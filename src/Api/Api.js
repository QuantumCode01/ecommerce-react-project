
import axios from 'axios';

const API_URL= import.meta.env.VITE_API_URL;

export async function getProducts(){
  try{
    const response=await axios.get(`${API_URL}/products`);
    return response.data;
  }catch(error){
     console.log(error.message);
     throw error;
  }
 
}
export async function getProductsByKeywords(keyword){
  try{
    const response=await axios.get(`${API_URL}/products?search=${keyword}`);
    return response.data;
  }catch(error){
     console.log(error.message);
     throw error;
  }
 
}


export async function getCartItems(){
  try{
    const response=await axios.get(`${API_URL}/cart-items?expand=product`)
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}
export async function getDeliveryOptions(){
  try{
    const response=await axios.get(`${API_URL}/delivery-options?expand=estimatedDeliveryTime`)
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}
export async function getPaymentSummary(){
  try{
    const response=await axios.get(`${API_URL}/payment-summary`)
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}
export async function getOrders(){
  try{
    const token = localStorage.getItem("accessToken");
    const response=await axios.get(`${API_URL}/orders?expand=products`,{
      headers:{
        Authorization:`Bearer ${token}`,
      }
    })
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}

export async function getUser(){
  try{
     const token = localStorage.getItem("accessToken");
    const response=await axios.get(`${API_URL}/auth/user`,{
      headers:{
        Authorization:`Bearer ${token}`,
      }
    })
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}
export async function getOrdersById(orderId){
  try{
    const response=await axios.get(`${API_URL}/orders/${orderId}?expand=products`)
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}
export async function addToCart(productdata){
  try{
    const response=await axios.post(`${API_URL}/cart-items`,
        productdata)
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}
export async function updateCartItem(cartData,productId){
  try{
    const response=await axios.put(`${API_URL}/cart-items/${productId}`,
        cartData)
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}
export async function DeleteCartItem(productId){
  try{
    const response=await axios.delete(`${API_URL}/cart-items/${productId}`)
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}
export async function placeOrder(){
  try{
    const response=await axios.post(`${API_URL}/orders`)
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}
export async function loginauthentication(payload){
  try{
    const response=await axios.post(`${API_URL}/auth/login`, payload, {
  headers: { "Content-Type": "application/json" }
});
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}


export async function signupAuthentication(payload){
  try{
    const response=await axios.post(`${API_URL}/auth/signup`, payload, {
  headers: { "Content-Type": "application/json" }
   });
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}


export async function forgetpassword(payload){
  try{
    const response=await axios.post(`${API_URL}/auth/forgot-password`, payload, {
  headers: { "Content-Type": "application/json" }
   });
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}
export async function resetPassword(token,payload){
  try{
    const response=await axios.post(`${API_URL}/auth/reset-password/${token}`, payload, {
  headers: { "Content-Type": "application/json" }
   });
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}


