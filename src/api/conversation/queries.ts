import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

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
  skip: number;
  total: number;
}

export const useGetPosts = () => {
  return useInfiniteQuery<PostsResponse>({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetch(
        `https://dummyjson.com/posts?limit=10&skip=${pageParam}`,
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.posts.length;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
  });
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
    enabled: !!id,
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
    staleTime: 1000 * 60 * 20,
    gcTime: 1000 * 60 * 20,
  });

  return {
    tags,
    tagsError,
    tagsLoading,
  };
};
