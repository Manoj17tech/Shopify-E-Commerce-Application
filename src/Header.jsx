import React from "react";
import "./Header.css";
import AddToCart from "./AddToCart";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/authSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

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
        {isAuthenticated && user?.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}
      </nav>

      <div className="header-right">
        {isAuthenticated ? (
          <>
            <div className="header-user">
              <span
                className={`header-role-badge ${user?.role === "admin" ? "admin" : "user"}`}
              >
                {user?.role}
              </span>
              <span className="header-username">{user?.name}</span>
            </div>
            <button className="header-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="header-login-btn">
            Sign In
          </Link>
        )}
        <AddToCart />
      </div>
    </header>
  );
}

export default Header;
