import React, { useState } from "react";
import { useVerifyToken } from "@/core/api/users/queries";
import { handleGetToken } from "@/core/libs/cookiesFunc";
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
        user: user ?? null,
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
