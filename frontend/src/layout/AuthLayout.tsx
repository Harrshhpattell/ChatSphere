// import Navbar from '@/components/Navbar'
// import { useAuthStore } from "@/store/useAuthStore";

import { useAppSelector } from "@/hooks/redux";
import { Loader } from "lucide-react";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  
  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/chat" />;
  }
  
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
