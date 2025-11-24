import React, { useState } from "react";
import { addToCart } from "../../Api/Api";
import { useCart } from "../../Context/Context";
export default function Product({ fetchCart, data }) {
  const {quantity,setQuantity}=useCart();
  const [added,setAdded]=useState(false);
  async function handleAddtoCart(payload) {
    try {
      const data = await addToCart(payload);
        fetchCart();
      setAdded(true);
      setTimeout(()=>{
         setAdded(false);
      },1000)
  
    } catch (error) {
      console.log(error.message);
    }
  }
  function changeQuantity(productId, value) {
  setQuantity(prev => ({
    ...prev,     
    [productId]: value  
  }));
fetchCart();}
  return (
    <div>
      <div  className="product-container">
        <div className="product-image-container">
          <img className="product-image" src={data.image} />
        </div>

        <div className="product-name limit-text-to-2-lines">{data.name}</div>

        <div className="product-rating-container">
          <img
            className="product-rating-stars"
            src={`images/ratings/rating-${data.rating.stars * 10}.png`}
          />
          <div className="product-rating-count link-primary">
            {data.rating.count}
          </div>
        </div>

        <div className="product-price">
          ${(data.priceCents / 100).toFixed(2)}
        </div>

        <div className="product-quantity-container">
          <select
            value={quantity[data.id] || 1}
            onChange={(event) => {
             ( changeQuantity(data.id,Number(event.target.value)));
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div className="product-spacer"></div>

        {added && (<div className="added-to-cart">
          <img src="images/icons/checkmark.png" />
          Added
        </div>)}
        

        <button
          className="add-to-cart-button button-primary"
          onClick={() => {
            handleAddtoCart({
              productId: data.id,
              quantity: quantity[data.id] || 1,
            });
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
