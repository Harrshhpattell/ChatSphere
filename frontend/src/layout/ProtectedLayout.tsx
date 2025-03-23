import { Navigate, Outlet, useLocation } from "react-router";
import { HelpCircle, Loader, MessageSquare, Settings, Users } from "lucide-react";
import { useAppSelector } from "@/hooks/redux";
import { Sidebar, SidebarItem } from "./components/sidebar";

const ProtectedLayout = () => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const currentPath = location.pathname;

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

  return (
    <div className="flex">
    <Sidebar>
        <SidebarItem icon={<MessageSquare size={20} />} text="Messages" active={currentPath === "/chat"}  alert={false} expanded={undefined}  to="/chat" />
        <SidebarItem icon={<Users size={20} />} text="Contacts" active={false} alert={false} expanded={undefined} />
        <SidebarItem icon={<Settings size={20} />} text="Settings"  active={currentPath === "/settings"}  alert={false} expanded={undefined}  to="/settings" />
        <SidebarItem icon={<HelpCircle size={20} />} text="Help" active={false} alert={false} expanded={undefined} />
      </Sidebar>
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
  )
};

export default ProtectedLayout;
