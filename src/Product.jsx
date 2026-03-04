import React, { useEffect } from "react";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import AddToCart from "./AddToCart";
import { addItem, removeItem } from "./redux/slice";
// import fetchProducts from './redux/productSlice'
import { fetchProducts } from "./redux/productSlice";

// creating Dispatch

function Product() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts()); //fetchProduct function is Calling
  }, []);

  const productSelector = useSelector((state) => state.products.items);

  console.log(productSelector);

  // Disabling the Button
  const cartSelector = useSelector((state) => state.cart.items);
  console.log(cartSelector);

  return (
    <div className="product-card">
      {productSelector.length &&
        productSelector.map((items) => (
          <div className="card" key={items.id} id="grid">
            <img src={items.thumbnail} alt={items.title} />
            <div className="content">
              <div className="title">{items.title}</div>
              <div className="brand">{items.brand}</div>
              <div className="price">₹{Math.trunc(items.price * 90.57)}</div>
              <div className="rating">⭐{items.rating}</div>
              {/* Button Disabling Feature */}
              {cartSelector.find((cartItem) => cartItem.id === items.id) ? (
                <button className="remove-btn" onClick={()=>dispatch(removeItem(items))}>Remove from Cart</button>
              ) : (
                <button
                  className="add-btn"
                  onClick={() => dispatch(addItem(items))}
                >
                  Add to Cart
                </button>
              )}
             
            </div>
          </div>
        ))}

      {/* <button className="add-btn" onClick={()=>{dispatch(addItem(1))}}>Add to Cart</button>
        <button className="remove-btn" onClick={()=>{dispatch(removeItem(1))}}>Remove from Cart</button> */}
    </div>
  );
}

export default Product;
