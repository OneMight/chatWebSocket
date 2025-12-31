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
  address: AdressData;
  error?: unknown;
  message?: string;
}
type PostUserDataType = {
  id: number;
  username: string;
  image: string;
};
type AdressData = {
  country: string;
};
type UserAuthType = {
  username: string;
  password: string;
};
type UserTokensType = {
  accessToken: string;
  refreshToken: string;
};
export type ChangeCredintionalsType = {
  id?: number;
  username?: string;
  lastname?: string;
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
        expiresInMins: 60,
      }),
      credentials: "omit",
    });
    return await response.json();
  } catch (error) {
    throw new Error("Error " + error);
  }
};

export const useVerifyToken = (accessToken: string) => {
  const getUser = async (): Promise<UserData> => {
    const response = await fetch("https://dummyjson.com/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "omit",
    });
    return response.json();
  };

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
    isSuccess,
  } = useQuery({
    queryKey: ["verifyToken", accessToken],
    queryFn: getUser,
    retry: false,
    enabled: !!accessToken,
    staleTime: 0,
    gcTime: 1000 * 60 * 30,
  });
  return {
    user,
    userLoading,
    userError,
    isSuccess,
  };
};
export const updateUser = async ({
  username,
  id,
  lastname,
}: ChangeCredintionalsType): Promise<UserData | unknown> => {
  try {
    const response = await fetch(`https://dummyjson.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        lastname,
        username,
      }),
    });
    alert(`Current last name: ${lastname}, current username: ${username}`);
    return response.json();
  } catch (error) {
    throw new Error("Error " + error);
  }
};
export const useGetImageOfUser = (id: number) => {
  const getUserImage = async (): Promise<PostUserDataType> => {
    const response = await fetch(
      `https://dummyjson.com/users/${id}?select=image,id,username`,
    );
    return response.json();
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getUserImage"],
    queryFn: getUserImage,
    staleTime: 1000 * 60 * 60,
  });
  return {
    data,
    isLoading,
    isError,
  };
};
