import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AddToCart() {
  const cartSelector = useSelector((state) => state.cart.items);
  // console.log(cartSelector);

 

  return (
    <div>
      <Link to="/cart">
        <div className="cart">
          <FaShoppingCart size="22" />
          <span className="cart-count">
            {cartSelector.length ? cartSelector.length : 0}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default AddToCart;
