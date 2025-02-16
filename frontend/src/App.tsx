import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./layout/AuthLayout";
import { useEffect } from "react";
import ProtectedLayout from "./layout/ProtectedLayout";
import Chat from "./pages/Chat";
import { checkAuth } from "./features/auth/authSlice";
import { useAppDispatch } from "./hooks/redux";

function App() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
    
  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
}

export default App;
