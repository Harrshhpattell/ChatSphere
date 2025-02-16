export interface User {
    id: string;
    fullName: string;
    email: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: any;
  }