import React, { useState } from "react";
import { useVerifyToken } from "@/api/users/queries";
import { handleGetToken } from "@/utils/getCookieToken";
import { AuthContext } from "../context/UserContext";
type ProviderProp = {
  children: React.ReactNode;
};
export function UserProvider({ children }: ProviderProp) {
  const [accessToken, setAccessToken] = useState<string>(
    handleGetToken("accessToken") || "",
  );
  const { user, userError, userLoading, isSuccess } =
    useVerifyToken(accessToken);

  const isAuthenticated = !!user && isSuccess;
  return (
    <AuthContext.Provider
      value={{
        user,
        userLoading,
        isAuthenticated,
        userError,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
