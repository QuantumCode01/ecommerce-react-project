import React from 'react'

import Product from './Product';
export default function ProductCard({Products,fetchCart}) { 
  return (
    <div>
       <div className="products-grid">
          {Products.map((data) => {
            return (
           <Product key={data.id} fetchCart={fetchCart} data={data}/>
            );
          })}
        </div>
    </div>
  )
}
