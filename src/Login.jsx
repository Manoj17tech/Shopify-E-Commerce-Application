import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login, clearAuthError } from "./redux/authSlice";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  // Redirect after successful login
  useEffect(() => {
    if (isAuthenticated) {
      const destination = location.state?.from?.pathname || "/";
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  // Clear stale errors when component mounts / unmounts
  useEffect(() => {
    dispatch(clearAuthError());
    return () => dispatch(clearAuthError());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            alt="Shopify Logo"
          />
          <h2>Shopify</h2>
        </div>

        <h3 className="auth-title">Sign in to your account</h3>

        {error && <p className="auth-error">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </form>

        <p className="auth-switch">
          Don&apos;t have an account?{" "}
          <Link to="/register">Create one</Link>
        </p>

        <div className="demo-credentials">
          <p className="demo-title">Demo Credentials</p>
          <div className="demo-row">
            <span className="role-badge admin">Admin</span>
            <span>admin@shopify.com / admin123</span>
          </div>
          <div className="demo-row">
            <span className="role-badge user">User</span>
            <span>user@shopify.com / user123</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
