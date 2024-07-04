import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../components/hooks/useAuth";

export default function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
