import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, getPublicUsers } from "./redux/authSlice";
import "./AdminDashboard.css";

const STATS = [
  { label: "Total Products", value: "100", icon: "📦" },
  { label: "Registered Users", value: "2+", icon: "👥" },
  { label: "Orders Today", value: "0", icon: "🛒" },
  { label: "Revenue (INR)", value: "₹0", icon: "💰" },
];

function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Derive user list from the single source of truth in authSlice
  const users = getPublicUsers();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <div className="admin-brand">
          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            alt="logo"
          />
          <span>Shopify Admin</span>
        </div>

        <nav className="admin-nav">
          <a href="/" className="admin-nav-link">🏠 Home / Shop</a>
          <a href="/admin" className="admin-nav-link active">📊 Dashboard</a>
        </nav>

        <button className="admin-logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      <main className="admin-main">
        <div className="admin-topbar">
          <h1 className="admin-heading">Dashboard</h1>
          <div className="admin-user-info">
            <span className="role-badge-admin">ADMIN</span>
            <span className="admin-username">{user?.name}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          {STATS.map((s) => (
            <div className="stat-card" key={s.label}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-info">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* User Management Table */}
        <section className="admin-section">
          <h2 className="section-title">User Management</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`table-role-badge ${u.role}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className="status-active">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Role Guide */}
        <section className="admin-section">
          <h2 className="section-title">Role Permissions</h2>
          <div className="permissions-grid">
            <div className="permission-card">
              <h3>
                <span className="table-role-badge admin">Admin</span>
              </h3>
              <ul>
                <li>✅ Access Admin Dashboard</li>
                <li>✅ View &amp; manage all users</li>
                <li>✅ Browse and add to cart</li>
                <li>✅ Place orders</li>
              </ul>
            </div>
            <div className="permission-card">
              <h3>
                <span className="table-role-badge user">User</span>
              </h3>
              <ul>
                <li>❌ No Admin Dashboard access</li>
                <li>✅ Browse products</li>
                <li>✅ Add to cart</li>
                <li>✅ Place orders</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
