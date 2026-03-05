import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CartList.css";
import { clearAllItem, removeItem } from "./redux/slice";
import { useNavigate } from "react-router-dom";

function CartList() {

  const cartSelector = useSelector((state) => state.cart.items);

  const [cartItems, setCartItems] = useState(cartSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const USD_TO_INR = 90.88;

  // Sync local state with redux state
  useEffect(() => {
    setCartItems(cartSelector);
  }, [cartSelector]);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + item.price * quantity;
  }, 0);

  // Manage Quantity
  const manageQuantity = (id, q) => {

    let quantity = parseInt(q, 10);
    quantity = quantity > 1 ? quantity : 1;

    const cartTempItems = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: quantity,
          }
        : item
    );

    setCartItems(cartTempItems);
  };

  // Place Order
  const placeOrderHandle = () => {

    if (cartItems.length > 0) {

      localStorage.clear();
      dispatch(clearAllItem());

      alert("Order Placed Successfully!");

      navigate("/");

    } else {

      alert("No items in the Cart");

    }
  };

  return (
    <>
      <div className="cart-container">

        <div className="cart-header">
          <h2>Cart Items</h2>
        </div>

        <div className="cart-top-actions">
          <span className="items-count">{cartItems.length} Items</span>
        </div>

        {/* Cart Items */}

        {cartItems.length > 0 ? (
          cartItems.map((item) => (

            <div className="cart-item" key={item.id}>

              <div className="item-info">
                <img src={item.thumbnail} alt={item.title} />

                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p>{item.brand}</p>
                </div>
              </div>

              <div className="item-actions">

                <div className="item-quantity">
                  <input
                    type="number"
                    value={item.quantity || 1}
                    min="1"
                    onChange={(e) =>
                      manageQuantity(item.id, e.target.value)
                    }
                  />
                </div>

                <span className="price">
                  ₹
                  {(
                    item.price *
                    (item.quantity || 1) *
                    USD_TO_INR
                  ).toFixed(2)}
                </span>

                <button
                  className="Remove-btn"
                  onClick={() => dispatch(removeItem(item))}
                >
                  Remove
                </button>

              </div>
            </div>

          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Your cart is empty
          </p>
        )}

      </div>

      {/* Cart Summary */}

      <div className="cart-summary">

        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{(totalPrice * USD_TO_INR).toFixed(2)}</span>
        </div>

        <div className="summary-row total">
          <span>Total</span>
          <span>₹{(totalPrice * USD_TO_INR).toFixed(2)}</span>
        </div>

        <button className="checkout-btn" onClick={placeOrderHandle}>
          Place Order
        </button>

      </div>
    </>
  );
}

export default CartList;