import React, { useState, useEffect } from "react";
import "./Tracking.css";
import { NavLink, useParams } from "react-router-dom";
import { getOrdersById } from "../Api/Api";
import dayjs from "dayjs";

export default function Tracking() {
  const [product, setProduct] = useState(null);
  const [delivpercent, setDeliveryPercent] = useState('');
  const { orderId, productId } = useParams();

  async function fetchOrderById() {
    const data = await getOrdersById(orderId);
    const item = data.products.find(p => p.productId === productId);
    console.log(data.orderTimeMs);
    setProduct(item);
    console.log(item.estimatedDeliveryTimeMs);
    const totalDeliveryTimeMs=Number(item.estimatedDeliveryTimeMs)-Number(data.orderTimeMs);
    const timePassedMs=dayjs().valueOf()-data.orderTimeMs;
    const deliveryPercent=(timePassedMs/totalDeliveryTimeMs)*100;
    setDeliveryPercent(deliveryPercent);
  }

  useEffect(() => {
    fetchOrderById(orderId);
  }, [orderId]); // add dependency so it doesn't loop

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="tracking-page">
      <div className="order-tracking">

        <NavLink to="/order" className="back-to-orders-link link-primary">
          View all orders
        </NavLink>

        <div className="delivery-date">
          Arriving on {dayjs(product.estimatedDeliveryTimeMs).format("MMMM D")}
        </div>

        <div className="product-info">
          {product.product.name}
        </div>

        <div className="product-info">
          Quantity: {product.quantity}
        </div>

        <img
          className="product-image"
         src={`/${product?.product?.image}`}
        />

        <div className="progress-labels-container">
          <div className={`progress-label ${delivpercent<=33?"current-status":""}`}>Preparing</div>
          <div className={`progress-label ${delivpercent>33 && delivpercent<100?"current-status":""}`}>Shipped</div>
          <div className={`progress-label ${delivpercent==100?"current-status":""}`} >Delivered</div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar"style={{width:`${delivpercent}%`}}></div>
        </div>
      </div>
    </div>
  );
}
