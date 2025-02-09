// import Navbar from '@/components/Navbar'
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      navigate("/chat");
    }
  }, [authUser, navigate]);
  
  return (
    <div>
      {/* <Navbar /> */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
