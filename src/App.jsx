import React from "react";
import Header from "./Header";
import Product from "./Product";
import "./App.css";
import { useDispatch } from "react-redux";
import { clearAllItem } from "./redux/slice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartList from "./CartList";

function App() {
  const dispatch = useDispatch();
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/"element={<Product/>}></Route>
          <Route path="/cart" element={<CartList/>}></Route>
          
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
