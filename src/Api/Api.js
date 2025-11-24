
import axios from 'axios';

const API_URL= import.meta.env.VITE_API_URL;

export async function getProducts(){
  try{
    const response=await axios.get(`${API_URL}/products`);
    console.log(response.data);
    return response.data;
  }catch(error){
     console.log(error.message);
     throw error;
  }
 
}


export async function getCartItems(){
  try{
    const response=await axios.get(`${API_URL}/cart-items?expand=product`)
    console.log(response.data);
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}
export async function getDeliveryOptions(){
  try{
    const response=await axios.get(`${API_URL}/delivery-options?expand=estimatedDeliveryTime`)
    console.log(response.data);
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}
export async function getPaymentSummary(){
  try{
    const response=await axios.get(`${API_URL}/payment-summary`)
    console.log(response.data);
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}
export async function getOrders(){
  try{
    const response=await axios.get(`${API_URL}/orders?expand=products`)
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
    console.log(response.data);
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}
export async function DeleteCartItem(productId){
  try{
    const response=await axios.delete(`${API_URL}/cart-items/${productId}`)
    console.log(response.data);
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}
export async function placeOrder(){
  try{
    const response=await axios.post(`${API_URL}/orders`)
    console.log(response.data);
    return (response.data);
  }catch(error){
    console.log(error.message);
    throw error;
  }
}


