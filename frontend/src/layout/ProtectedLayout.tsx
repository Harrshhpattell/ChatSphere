import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAppSelector } from "@/hooks/redux";

const ProtectedLayout = () => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
