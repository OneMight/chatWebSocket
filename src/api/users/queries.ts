import { useQuery } from "@tanstack/react-query";

interface CompanyData {
  department: string;
  name: string;
  title: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  image: string;
  company: CompanyData;
}

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
