import { Button, Post, TypographyH3 } from "@/components";
import { Aside } from "@/layouts";
import PlusIcon from "@/assets/plus-icon.svg?react";
import { useGetPosts } from "@/api/conversation/queries";
export default function Home() {
  const { postsResponse, postsError, postsLoading } = useGetPosts();

  if (postsLoading) {
    return <p>loading</p>;
  }
  if (postsError) {
    return <p>Error</p>;
  }
  const posts = postsResponse?.posts;
  return (
    <div className="flex flex-row gap-6 justify-between w-full items-start relative">
      <section className="w-2/3 flex gap-8 flex-col items-center">
        <div className=" w-full flex flex-row items-center justify-start">
          <TypographyH3>Latest Conversations</TypographyH3>
        </div>
        <div className="w-full flex flex-col items-start gap-4">
          <Button className="rounded-xl w-full cursor-pointer">
            <PlusIcon />
            Start a New Conversation
          </Button>
          <div className="w-full flex flex-col gap-3 items-center mb-4">
            {posts?.map((p) => {
              return <Post key={p.id} post={p} />;
            })}
          </div>
        </div>
      </section>
      <Aside />
    </div>
  );
}
