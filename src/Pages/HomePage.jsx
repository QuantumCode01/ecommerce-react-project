import React, { useEffect } from "react";
import { useState } from "react";
import "./HomePage.css";

import { Link } from "react-router-dom";
import { getProducts } from "../Api/Api";
import ProductCard from "../Components/ProductCard/ProductCard";
export default function HomePage({fetchCart}) {
  const [Products, setProducts]=useState([]);
  async function fetchData(){
    const data=await getProducts();
    setProducts(data);

  }

  useEffect(()=>{
    fetchData();
  },[])
  return (
    <div>

      <div className="home-page">
       <ProductCard Products={Products} fetchCart={fetchCart}/>
      </div>
    </div>
  );
}
