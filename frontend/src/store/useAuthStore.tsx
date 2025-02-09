import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthState {
  authUser: string | null;
  isCheckingAuth: boolean;
  setAuthUser: (user: string | null) => void;
  setCheckingAuth: (isChecking: boolean) => void;
  checkAuth: () => Promise<void>;
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
}));
