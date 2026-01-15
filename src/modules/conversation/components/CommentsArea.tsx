import { useGetCommentsById } from "@/modules/conversation/api/queries";
import { ROUTES } from "@/core/routes/routesPath";
import { useParams } from "@tanstack/react-router";
import { Spinner } from "@/core/index";
import { Comment } from "./Comment";
import { Textarea } from "../index";
import { useAuth } from "@/app/context/UserContext";
import { cn } from "@/core/libs/utils";
export const CommentsArea = () => {
  const { postId } = useParams({ from: ROUTES.POSTPAGE });
  const { data, commentsLoading } = useGetCommentsById(postId);
  const context = useAuth();

  if (commentsLoading) {
    return <Spinner />;
  }
  return (
    <article className="flex flex-col items-start w-full gap-4 bg-white-color p-4">
      <p>Comments {data.total}</p>
      {data.comments.length !== 0 ? (
        <>
          <Textarea
            id="commentArea"
            aria-label="comment-text-area"
            className={cn("max-h-50 min-h-50 sm:min-h-16")}
            disabled={!context.isAuthenticated && true}
            placeholder="Write your oppinion here!"
          />
          {data.comments.map((comm) => (
            <Comment data={comm} key={comm.id} />
          ))}
        </>
      ) : (
        <p>No comments here</p>
      )}
    </article>
  );
};
