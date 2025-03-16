import React, { useState, ReactNode } from "react";
import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const [expanded, setExpanded] = useState<boolean>(true);

  // Clone children and pass expanded prop to them
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement<Partial<SidebarItemProps>>(child)) {
      return React.cloneElement(child, { expanded });
    }
    return child;
  });

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

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="User avatar"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export { Sidebar, SidebarItem };
