import { useSuspenseQuery } from "@tanstack/react-query";
type CommentsRespose = {
  total: number;
  comments: Comments[];
};
export type Comments = {
  id: number;
  body: string;
  likes: number;
  user: UserCred;
};
type UserCred = {
  id: number;
  fullName: string;
};
export const useGetCommentsById = (id: number) => {
  const getCommentsById = async (): Promise<CommentsRespose> => {
    const response = await fetch(`https://dummyjson.com/posts/${id}/comments`);
    return response.json();
  };
  const { data, isLoading: commentsLoading } = useSuspenseQuery({
    queryKey: ["getCommentsById", id],
    queryFn: getCommentsById,
    staleTime: 0,
  });
  return {
    data,
    commentsLoading,
  };
};
type PostComment = {
  postId: number;
  userId: number;
  body: string;
};
export const postComment = async (data: PostComment) => {
  fetch(`https://dummyjson.com/comments/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      body: data.body,
      postId: data.postId,
      userId: data.userId,
    }),
  });
};
