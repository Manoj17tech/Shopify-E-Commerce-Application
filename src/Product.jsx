import React, { useEffect } from "react";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "./redux/slice";
import { fetchProducts } from "./redux/productSlice";
import { useNavigate } from "react-router-dom";

function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const productSelector = useSelector((state) => state.products.items);
  const cartSelector = useSelector((state) => state.cart.items);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    dispatch(addItem(item));
  };

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
              {cartSelector.find((cartItem) => cartItem.id === items.id) ? (
                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeItem(items))}
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  className="add-btn"
                  onClick={() => handleAddToCart(items)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Product;
