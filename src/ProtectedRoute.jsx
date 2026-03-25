import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Wraps a route so that:
 *  - Unauthenticated users are redirected to /login (with return path preserved)
 *  - Users whose role doesn't match `requiredRole` are redirected to /
 */
function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
