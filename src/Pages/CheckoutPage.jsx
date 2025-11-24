import React, { useEffect, useState } from "react";
import "./CheckoutPage.css";
import "./CheckoutHeader.css";
import { getDeliveryOptions } from "../Api/Api";
import { Link } from "react-router-dom";
import { getPaymentSummary } from "../Api/Api";
import OrderSummary from "../Components/OrderSummary";
import PaymentSummary from "../Components/PaymentSummary";
export default function CheckoutPage({ cart,fetchCart }) {
  const [deliveryOptions, setdeliveryOptions] = useState([]);
  const [payment, setPayment] = useState([]);
  async function fetchDeliveryOptions() {
    const data = await getDeliveryOptions();
    setdeliveryOptions(data);
    console.log(data);
  }
  async function fetchPaymentSummary() {
    const data = await getPaymentSummary();
    setPayment(data);
  }
  useEffect(() => {
    fetchDeliveryOptions();
  }, []);
  useEffect(() => {
    fetchPaymentSummary();
  }, [cart]);
  return (
    <div>
      <title>Checkout</title>
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
        <OrderSummary deliveryOptions={deliveryOptions} cart={cart} fetchCart={fetchCart}/>
          {payment && (
         <PaymentSummary payment={payment} fetchCart={fetchCart} />
          ) }
        </div>
      </div>
    </div>
  );
}
