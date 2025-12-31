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
export type UserPosts = {
  posts: PostData[];
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
export const useGetPostsByUserId = (id: number | undefined) => {
  const getPosts = async (userId: number): Promise<UserPosts> => {
    const response = await fetch(
      `https://dummyjson.com/users/${userId}/posts?limit=5`,
    );
    return response.json();
  };

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getPosts", id],
    queryFn: () => getPosts(id!),
    enabled: typeof id !== "undefined",
    staleTime: 0,
  });

  return {
    posts,
    isLoading,
    isError,
  };
};

export const useGetAllTags = () => {
  const fetchTags = async (): Promise<string[]> => {
    const response = await fetch("https://dummyjson.com/posts/tag-list");
    return response.json();
  };

  const {
    data: tags,
    isLoading: tagsLoading,
    isError: tagsError,
  } = useQuery({
    queryKey: ["fetchTags"],
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 60,
  });

  return {
    tags,
    tagsError,
    tagsLoading,
  };
};
