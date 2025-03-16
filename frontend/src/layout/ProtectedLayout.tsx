import { Navigate, Outlet } from "react-router-dom";
import { HelpCircle, Loader, MessageSquare, Settings, Users } from "lucide-react";
import { useAppSelector } from "@/hooks/redux";
import { Sidebar, SidebarItem } from "./components/sidebar";

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
console.log("windows", window.location.pathname)
  return (
    <div className="flex">
    <Sidebar>
        <SidebarItem icon={<MessageSquare size={20} />} text="Messages" active={false} alert={true} expanded={undefined} />
        <SidebarItem icon={<Users size={20} />} text="Contacts" active={false} alert={false} expanded={undefined} />
        <SidebarItem icon={<Settings size={20} />} text="Settings"  active={window.location.pathname === "/settings"}  alert={false} expanded={undefined}  to="/settings" />
        <SidebarItem icon={<HelpCircle size={20} />} text="Help" active={false} alert={false} expanded={undefined} />
      </Sidebar>
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
  )
};

export default ProtectedLayout;
