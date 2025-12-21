import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useCart } from "../../Context/Context";
export default function Header({ cartCount }) {
  const Navigate=useNavigate();
  const { searchterm, handleSearch, getData, isloggedin, setloggedin,user } =
    useCart();
      const [open, setOpen] = useState(false);
  
  function handleLogout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  setloggedin(false);
   setOpen(false)

  Navigate('/')   // update context
}
  return (
    <div>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src="/images/ecommercelogo.png" />
            <p className="mobile-logo">E</p>
          </NavLink>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getData(); // function to trigger search API
              }
            }}
          />

          <button className="search-button" onClick={getData}>
            <img className="search-icon" src="/images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <div className="user-dropdown" style={{ position: "relative", display: "inline-block" }}>
      {isloggedin ? (
        <>
          <span
            className="username"
            onClick={() => setOpen(!open)}
            style={{ cursor: "pointer" }}
          >
            {user?.name || user} ▼
          </span>

          {open && (
            <div
              className="dropdown-item "
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                minWidth: "150px",
                zIndex: 100,
              }}
            >
              <NavLink
                to="/profile"
                className="dropdown-item  text-[#333] hover:bg-[#084F2D] hover:text-white !important;"
                style={{ display: "block", padding: "8px 12px", textDecoration: "none"}}
                onClick={() => setOpen(false)}
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="dropdown-item text-[#333] hover:bg-[#084F2D] hover:text-white !important;"
                style={{
                  display: "block",
                  padding: "8px 12px",
                  width: "100%",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
               
                }}
              >
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <NavLink to="/login" className="orders-link header-link">
          <span className="login-text">Login/Signup</span>
        </NavLink>
      )}
    </div>

          <NavLink to="/order" className="orders-link header-link">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink to="/checkout" className="cart-link header-link">
            <img className="cart-icon" src="/images/icons/cart-icon.png" />
            <div className="cart-quantity">{cartCount}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
