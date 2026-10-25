import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};
