import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./CartList.css";

function CartList() {
  const cartSelector = useSelector((state) => state.cart.items);
  // console.log(cartSelector);

  const [cartItems, setCartItems] = useState(cartSelector);
  // total Price
  const totalPrice = cartItems.reduce(
    (total, item) =>
      item.quantity ? total + item.price * item.quantity : total + item.price,
    0,
  );
  // console.log(totalPrice * 90.88);

  const manageQuantity = (id, q) => {
    // console.log(id,q);

    let quantity = parseInt(q) > 1 ? parseInt(q) : 1;

    const cartTempItems = cartSelector.map((item) => {
      return item.id == id
        ? {
            ...item,
            quantity,
          }
        : item;
    });
    // console.log(cartTempItems[0]);

    setCartItems(cartTempItems);
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

        {/* Cart items list below */}

        {cartItems.length > 0
          ? cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="item-info">
                  <img src={item.thumbnail} />
                  <div className="item-details">
                    <h4>{item.title}</h4>
                    <p>{item.brand}</p>
                  </div>
                </div>

                <div className="item-actions">
                  <div className="item-quantity">
                    <input
                      type="number"
                      placeholder="enter the quantity"
                      value={item.quantity || 1}
                      min="1"
                      onChange={(e) => manageQuantity(item.id, e.target.value)}
                    />
                  </div>
                  <span className="price">
                    {item.quantity
                      ? (item.price * item.quantity * 90.88).toFixed(2)
                      : (item.price * 90.88).toFixed(2)}
                  </span>
                  <button className="Remove-btn">Remove</button>
                </div>
              </div>
            ))
          : null}
      </div>
      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{(totalPrice * 90.88).toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>₹{(totalPrice * 90.88).toFixed(2)}</span>
        </div>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </>
  );
}

export default CartList;
