import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface AuthUser {
  _id: string;
  email: string;
  fullName: string;
  profilePic: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthState {
  authUser: AuthUser | null;
  isCheckingAuth: boolean;
  setAuthUser: (user: AuthUser | null) => void;
  setCheckingAuth: (isChecking: boolean) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  setAuthUser: (user) => set({ authUser: user }),
  setCheckingAuth: (isChecking) => set({ isCheckingAuth: isChecking }),
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("res", res);
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  logout: async () => {
    await axiosInstance.post('/auth/logout');
    set({ authUser: null });
    toast.success("Logged out successfully!");
  },
}));
