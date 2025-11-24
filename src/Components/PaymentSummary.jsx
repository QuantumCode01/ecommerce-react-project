import React from 'react'
import { placeOrder } from '../Api/Api'
import { useNavigate } from 'react-router-dom'
export default function PaymentSummary({payment,fetchCart}) {
  const navigate=useNavigate();
  async function submitOrder(){
    const data= await placeOrder();
    await fetchCart();
     navigate('/order');
  }
  return (
    <div>
       <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            <div className="payment-summary-row">
              <div>Items ({payment?.totalItems}):</div>
              <div className="payment-summary-money">
                ${(payment.productCostCents / 100).toFixed(2)}
              </div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">
                ${payment?.shippingCostCents / 100}
              </div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">
                ${payment?.totalCostBeforeTaxCents / 100}
              </div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">
                ${payment.taxCents / 100}
              </div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">
                ${payment.totalCostCents / 100}
              </div>
            </div>

            <button className="place-order-button button-primary" onClick={submitOrder}>
              Place your order
            </button>
          </div>
    </div>
  )
}
