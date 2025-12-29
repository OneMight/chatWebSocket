import { useQuery } from "@tanstack/react-query";

interface Reactions {
  likes: number;
  dislikes: number;
}
export type PostData = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  view: number;
  userId: number;
  reactions: Reactions;
};

interface PostsResponse {
  posts: PostData[];
  limit: number;
  total: number;
}

export const useGetPosts = () => {
  const fetchPost = async (): Promise<PostsResponse> => {
    const response = await fetch("https://dummyjson.com/posts/?limit=10");
    return await response.json();
  };
  const {
    data: postsResponse,
    isError: postsError,
    isLoading: postsLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPost,
    staleTime: 0,
  });
  return {
    postsResponse,
    postsLoading,
    postsError,
  };
};
