import React, { useState } from "react";
import dayjs from "dayjs";
import { updateCartItem } from "../Api/Api";
import { DeleteCartItem } from "../Api/Api";
import { useCart } from "../Context/Context";
export default function OrderSummary({ deliveryOptions, cart, fetchCart }) {
  const { quantity, setQuantity } = useCart();

  const [isUpdating, setUpdating] = useState({});
  async function changeQuantity(productId, value) {
    setQuantity((prev) => ({
      ...prev,
      [productId]: value,
    }));
    await fetchCart();
  }
  async function hadleCartData(productId, cartData) {
    const payload = {
      deliveryOptionId: cartData,
    };
    const data = await updateCartItem(payload, productId);
    await fetchCart();
  }

  async function deleteCartItem(productId) {
    const data = await DeleteCartItem(productId);
    await fetchCart();
  }
  async function updateQuantity(productId) {
    if (isUpdating[productId]) {
      const newQuantity =
        quantity[productId] ??
        cart.find((c) => c.productId === productId).quantity;

      const payload = { quantity: newQuantity };
      await updateCartItem(payload, productId);
      await fetchCart();
    }
    setUpdating((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  }

  return (
    <div>
      <div className="order-summary">
        {deliveryOptions.length > 0 &&
          cart.map((cartItem) => {
            const day = deliveryOptions.find((item) => {
              return item.id === cartItem.deliveryOptionId;
            });
            return (
              <div key={cartItem.product.id} className="cart-item-container">
                <div className="delivery-date">
                  Delivery date:{" "}
                  {dayjs(day.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
                </div>

                <div className="cart-item-details-grid">
                  <img className="product-image" src={cartItem.product.image} />

                  <div className="cart-item-details">
                    <div className="product-name">{cartItem.product.name}</div>
                    <div className="product-price">
                      ${(cartItem.product.priceCents / 100).toFixed(2)}
                    </div>
                    <div className="product-quantity">
                      <span>
                        Quantity:{" "}
                        {isUpdating[cartItem.productId] ? (
                          <input
                            type="text"
                            value={
                              quantity[cartItem.productId] ?? cartItem.quantity
                            }
                            className="quantity-value"
                            onChange={(event) => {
                              changeQuantity(
                                cartItem.productId,
                                Number(event.target.value)
                              );
                            }}
                          />
                        ) : (
                          <span className="quantity-label">
                            {cartItem.quantity}
                          </span>
                        )}
                      </span>
                      <span
                        className="update-quantity-link link-primary"
                        onClick={() => {
                          updateQuantity(cartItem.productId);
                        }}
                      >
                        {isUpdating[cartItem.productId] ? "Save" : "Update"}
                      </span>
                      <span
                        className="delete-quantity-link link-primary"
                        onClick={() => {
                          deleteCartItem(cartItem.productId);
                        }}
                      >
                        Delete
                      </span>
                    </div>
                  </div>

                  <div className="delivery-options">
                    <div className="delivery-options-title">
                      Choose a delivery option:
                    </div>

                    {deliveryOptions.map((deliveryOption) => {
                      let priceString = "Free Shipping";

                      if (deliveryOption.priceCents > 0) {
                        priceString = `$ ${(
                          deliveryOption.priceCents / 100
                        ).toFixed(2)} - Shipping`;
                      }
                      return (
                        <div
                          key={deliveryOption.id}
                          className="delivery-option"
                          onClick={() => {
                            hadleCartData(
                              cartItem.productId,
                              deliveryOption.id
                            );
                          }}
                        >
                          <input
                            type="radio"
                            checked={
                              deliveryOption.id === cartItem.deliveryOptionId
                            }
                            onChange={() => {}}
                            className="delivery-option-input"
                            name={`delivery-option-${cartItem.productId}`}
                          />
                          <div>
                            <div className="delivery-option-date">
                              {dayjs(
                                deliveryOption.estimatedDeliveryTimeMs
                              ).format("dddd, MMMM D")}
                            </div>
                            <div className="delivery-option-price">
                              {priceString}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
