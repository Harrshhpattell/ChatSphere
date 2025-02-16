import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./layout/AuthLayout";
import { useEffect, useState } from "react";
import ProtectedLayout from "./layout/ProtectedLayout";
import Chat from "./pages/Chat";
import { checkAuth } from "./features/auth/authSlice";
import { useAppDispatch } from "./hooks/redux";

function App() {
  const dispatch = useAppDispatch();
  const [isHeaderOpen, setIsHeaderOpen] = useState<boolean>(true);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <div className="relative">
          {/* Collapsible Header */}
          <header
            className={`bg-yellow-500 text-white overflow-hidden transition-all duration-300 ease-in-out ${
              isHeaderOpen ? "h-14" : "h-0"
            }`}
          >
            <div className="text-center p-4">
              🚧 This application is currently under development. 🚧
            </div>
          </header>

          {/* Toggle Button */}
          <button
            onClick={() => setIsHeaderOpen(!isHeaderOpen)}
            className="absolute left-0 top-20 z-10 h-14 w-8 flex items-center justify-center bg-yellow-600 text-white"
            aria-label={isHeaderOpen ? "Collapse header" : "Expand header"}
          >
            <span className="transform transition-transform duration-300">
              {isHeaderOpen ? "❯" : "❮"}
            </span>
          </button>
          <Routes>
            <Route index element={<Home />} />

            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>

            {/* Protected Routes (For authenticated users) */}
            <Route element={<ProtectedLayout />}>
              <Route path="/chat" element={<Chat />} />
              <Route path="/dashboard" element={<Home />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
