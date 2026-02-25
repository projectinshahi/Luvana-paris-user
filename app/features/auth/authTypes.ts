export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}