import React, { useState, ReactNode } from "react";
import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/features/auth/authSlice";
import toast from "react-hot-toast";

// Define prop types for SidebarItem
interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  expanded?: boolean;
  to?: string;
}

// SidebarItem component that receives expanded as a prop
const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active = false,
  alert = false,
  expanded,
  to,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
      onClick={handleClick}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
};

// Define prop types for Sidebar
interface SidebarProps {
  children: ReactNode;
}

// Sidebar component that manages its own expanded state
const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState<boolean>(true);
  const { user } = useAppSelector((state) => state.auth);

  // Clone children and pass expanded prop to them
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement<Partial<SidebarItemProps>>(child)) {
      return React.cloneElement(child, { expanded });
    }
    return child;
  });

   const handleLogout = async () => {
      try {
        await dispatch(logout()).unwrap();
        toast.success("Logout successfully!");
        navigate("/login", { replace: true });
      } catch (error) {
        console.error("Logout failed:", error);
        toast.error("Logout failed. Please try again.");
      }
    };

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <span
            className={`flex items-center gap-2 text-primary font-medium overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
          >
            <div className="inline-flex p-2 rounded-lg bg-primary/10 group">
              <MessageSquare className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
            </div>{" "}
            ChatSphere
          </span>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-3">{childrenWithProps}</ul>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="border-t flex p-3">
              <Avatar className="h-10- w-10 rounded-md border-4 border-background">
                <AvatarImage src={user?.profilePic} alt="Profile" />
                <AvatarFallback className="text-4xl">
                  {user?.fullName
                    ? user.fullName.substring(0, 2).toUpperCase()
                    : "U"}
                </AvatarFallback>
              </Avatar>
              <div
                className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
              >
                <div className="leading-4">
                  <h4 className="font-semibold">{user?.fullName}</h4>
                  <span className="text-xs text-gray-600">{user?.email}</span>
                </div>
                <MoreVertical size={20} />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" onClick={handleLogout}>
            <DropdownMenuItem>
              <LogOut size={20} /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </aside>
  );
};

export { Sidebar, SidebarItem };
