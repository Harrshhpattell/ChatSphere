export interface User {
    id: string;
    fullName: string;
    email: string;
    createdAt: string;
    profilePic: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: any;
  }