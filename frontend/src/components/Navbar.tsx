import { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";
// import { useMutation } from "@tanstack/react-query";
// import { axiosInstance } from "@/lib/axios";
// import toast from "react-hot-toast";

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar = ({ isDarkMode, toggleTheme }: HeaderProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authUser, logout } = useAuthStore();
  
  const navItems = ["Home", "Features", "Pricing", "FAQs", "Contact"];

  // const logoutMutation = useMutation({
  //   mutationFn: async () => {
  //     await axiosInstance.get("/auth/logout");
  //   },
  //   onSuccess: () => {
  //     toast.success("Logout successfully!");
  //     setAuthUser(null);
  //     navigate("/login", { replace: true });
  //   },
  //   onError: (error) => {
  //     console.error("Logout failed:", error);
  //   },
  // });

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="fixed w-full bg-white dark:bg-gray-900 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold">ChatSphere</h1>
        </motion.div>

        <nav className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-blue-500 transition-colors"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* If user is logged in, show profile */}
          {authUser ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1">
                <User className="h-5 w-5" />
                <span className="text-sm">{authUser.fullName}</span>
              </button>

              {/* Dropdown for logout */}
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg hidden group-hover:block">
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="login">
                <Button variant="outline" className="hidden md:inline-flex">
                  Sign In
                </Button>
              </Link>
              <Link to="signup">
                <Button className="hidden md:inline-flex">Get Started</Button>
              </Link>
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white dark:bg-gray-800 py-4"
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}

          {/* Mobile view authentication buttons */}
          <div className="px-4 py-2">
            {authUser ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="login">
                  <Button variant="outline" className="w-full mb-2">
                    Sign In
                  </Button>
                </Link>
                <Link to="signup">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
