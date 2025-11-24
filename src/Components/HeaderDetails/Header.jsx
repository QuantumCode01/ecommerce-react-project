import React from 'react'
import { NavLink } from 'react-router-dom';
import './Header.css';
export default function Header({cartCount}) {
  return (
    <div>
        <div className="header">
        <div className="left-section">
            <NavLink to="/" className="header-link">
            <img className="logo"
                src="/images/ecommercelogo.png" />
           <p className="mobile-logo">
                E</p>
            </NavLink>
        </div>

        <div className="middle-section">
            <input className="search-bar" type="text" placeholder="Search" />

            <button className="search-button">
            <img className="search-icon" src="/images/icons/search-icon.png" />
            </button>
        </div>

        <div className="right-section">
            <NavLink to="/order" className="orders-link header-link" >

            <span className="orders-text">Orders</span>
            </NavLink>

            <NavLink to="/checkout" className="cart-link header-link" >
            <img className="cart-icon" src="/images/icons/cart-icon.png" />
            <div className="cart-quantity">{cartCount}</div>
            <div className="cart-text">Cart</div>
            </NavLink>
        </div>
        </div>
    </div>
  )
}
