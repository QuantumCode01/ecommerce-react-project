import React, { useEffect, useState,Fragment } from "react";
import { Link } from "react-router-dom";
import "./Orders.css";
import { useCart } from "../Context/Context";
import { getOrders } from "../Api/Api";
import { NavLink } from 'react-router-dom';
import dayjs from "dayjs";
import { addToCart } from "../Api/Api";
export default function OrdersPage({fetchCart}) {
    const [added,setAdded]=useState(false);

    const [orders, setOrders] = useState([]);
    async function fetchOrders() {
      const data = await getOrders();
      setOrders(data);
    }

    async function handleAddtoCart(payload) {
        try {
          const data = await addToCart(payload);
          console.log(data);
            fetchCart();
          setAdded(true);
          setTimeout(()=>{
            setAdded(false);
          },1000)
      
        } catch (error) {
          console.log(error.message);
        }
      }
    useEffect(() => {
      fetchOrders();
    }, []);
  return (
    <div>
      <title>Order</title>
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(Number(order.orderTimeMs)).format("MMMM, D")}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>${(order.totalCostCents / 100).toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((prodct) => {
                    return (
                      <Fragment key={prodct.id}>
                        <div className="product-image-container">
                          <img src={prodct.product.image} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                             {prodct.product.name}

                          </div>
                          <div className="product-delivery-date">
                            Arriving on: {dayjs(prodct.estimatedDeliveryTimeMs).format("MMMM, D")}
                          </div>
                          <div className="product-quantity">Quantity: {prodct.quantity}</div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                            />
                            <span className="buy-again-message"
                             onClick={() => {
                            handleAddtoCart({
                              productId: prodct.id,
                              quantity: prodct.quantity || 1,
                            });
                          }}>
                              Add to Cart
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <NavLink to={`/track/${order.id}/${prodct.productId}`}>
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </NavLink>
                        </div>
                      </Fragment>
                    );
                  })}

                
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
