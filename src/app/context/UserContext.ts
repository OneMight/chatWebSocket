import type { UserData } from "@/api/users/queries";
import { useContext, createContext } from "react";
export interface AuthContextType {
  user: UserData | undefined;
  userLoading: boolean;
  isAuthenticated: boolean;
  userError: boolean;
  setAccessToken?: (token: string) => void;
}
export const AuthContext = createContext<AuthContextType | null>({
  user: undefined,
  userLoading: true,
  isAuthenticated: false,
  userError: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
