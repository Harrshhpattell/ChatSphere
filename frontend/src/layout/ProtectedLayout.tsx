import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

const ProtectedLayout = () => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;

  return authUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedLayout;
