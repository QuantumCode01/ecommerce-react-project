import React, { Component } from 'react'
import { useCart } from '../Context/Context';
import { Navigate, Outlet } from 'react-router-dom';
export default function Protected() {
    const {isloggedin}=useCart();
    const token=localStorage.getItem('accessToken');
    if(!token){
        return  <Navigate to="/login" replace/>;
    }
  return <Outlet/>;
  
}
