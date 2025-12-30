import type { UserData } from "@/api/users/queries";
import { useContext, createContext } from "react";
interface AuthContextType {
  user: UserData | undefined;
  userLoading: boolean;
  isAuthenticated: boolean;
  userError: boolean;
  setAccessToken: (token: string) => void;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => useContext(AuthContext);
