import { Button, CommentsArea, Post, Spinner } from "@/components";
import { ROUTES } from "@/routesPath";
import { useNavigate, useParams } from "@tanstack/react-router";
import BackIcon from "@/assets/back-icon.svg?react";
import { Aside } from "@/layouts";
import { useGetPostById } from "@/api/conversation/queries";
export const Conversation = () => {
  const navigate = useNavigate();
  const { postId } = useParams({ from: ROUTES.POSTPAGE });
  const handleHomeNavigate = () => {
    navigate({ to: ROUTES.HOME });
  };
  const { postData, isLoading } = useGetPostById(postId);
  if (isLoading || !postData) {
    <Spinner className="size-10" />;
  }
  return (
    <main className="flex flex-row gap-6 justify-between items-start w-full">
      <section className="flex flex-col items-start justify-center gap-4 w-full sm:w-2/3">
        <Button
          className="bg-transparent text-black-text justify-between cursor-pointer hover:bg-transparent hover:text-bg-button w-30  has-[>svg]:px-0"
          onClick={handleHomeNavigate}
        >
          <BackIcon />
          Back to home
        </Button>
        <Post post={postData} key={postData?.id} />
        <CommentsArea />
      </section>

      <Aside className={"hidden sm:block sm:w-1/3"} />
    </main>
  );
};
