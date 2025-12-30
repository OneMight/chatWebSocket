import { useQuery } from "@tanstack/react-query";

interface CompanyData {
  department: string;
  name: string;
  title: string;
}

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  image: string;
  company: CompanyData;
}
type UserAuthType = {
  username: string;
  password: string;
};
type UserTokensType = {
  accessToken: string;
  refreshToken: string;
};

export const useGetUserById = (id: number) => {
  const userById = async (): Promise<UserData> => {
    const response = await fetch(`https://dummyjson.com/users/${id}`);
    return await response.json();
  };

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ["userById"],
    queryFn: userById,
    enabled: !!id,
    gcTime: 1000,
    staleTime: 0,
  });

  return {
    user,
    userLoading,
    userError,
  };
};
export const getToken = async (
  userCred: UserAuthType,
): Promise<UserTokensType | undefined> => {
  try {
    const response = await fetch("https://dummyjson.com/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userCred.username,
        password: userCred.password,
        expiresInMins: 30,
      }),
      credentials: "omit",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const useVerifyToken = (accessToken: string | undefined) => {
  const getUser = async (): Promise<UserData> => {
    const response = await fetch("https://dummyjson.com/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "omit",
    });
    return await response.json();
  };

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
    isSuccess,
  } = useQuery({
    queryKey: ["verifyToken", accessToken],
    queryFn: getUser,
    enabled: !!accessToken,
    staleTime: 0,
    gcTime: 1000,
  });
  return {
    user,
    userLoading,
    userError,
    isSuccess,
  };
};
