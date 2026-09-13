import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function ProtectedRoute({
  children,
  adminOnly = false,
}) {
  const { user } = useApp();
  const location = useLocation();

  // User is not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // Admin-only page
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/profile" replace />;
  }

  // Normal protected page should not be accessible
  // to an admin unless explicitly intended.
  if (!adminOnly && user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return children;
}