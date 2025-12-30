import React, { useState } from "react";
import { useVerifyToken } from "@/api/users/queries";
import { handleGetToken } from "@/utils/getCookieToken";
import { AuthContext } from "../context/UserContext";
type ProviderProp = {
  children: React.ReactNode;
};
export function UserProvider({ children }: ProviderProp) {
  const accessToken = handleGetToken("accessToken");
  const { user, userError, userLoading } = useVerifyToken(accessToken);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!user && !userError,
  );
  const handleIsAuth = (value: boolean) => {
    setIsAuthenticated(value);
  };
  return (
    <AuthContext.Provider
      value={{ user, userLoading, isAuthenticated, userError, handleIsAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
