import React from "react";
import Header from "./Header";
import Product from "./Product";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartList from "./CartList";
import Login from "./Login";
import Register from "./Register";
import AdminDashboard from "./AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
