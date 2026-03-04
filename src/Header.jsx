import React from "react";
import "./Header.css";
import AddToCart from "./AddToCart";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img
          src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
          alt="Shop Logo"
        />
        <h2>Shopify</h2>
      </div>

      <nav className="nav">
        <Link to="/">Home</Link>
        {/* <a href="#">Products</a> */}
      </nav>
      <AddToCart/>

     
    </header>
  );
}

export default Header;
