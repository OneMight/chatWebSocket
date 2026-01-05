import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Post, Spinner, TypographyH3 } from "@/components";
import { Aside } from "@/layouts";
import { useGetPosts } from "@/api/conversation/queries";
import { CreateConversation } from "@/layouts";

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGetPosts();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") return <Spinner className="size-10" />;
  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div className="flex flex-row gap-6 justify-between w-full items-start relative">
      <section className="w-full sm:w-2/3 flex gap-8 flex-col items-center">
        <div className="w-full flex flex-row items-center justify-start">
          <TypographyH3>Latest Conversations</TypographyH3>
        </div>
        <div className="w-full flex flex-col items-center gap-4">
          <CreateConversation />
          <div className="w-full flex flex-col gap-3 items-center mb-4">
            {allPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
          <div
            ref={ref}
            className="h-10 w-full flex justify-center items-center"
          >
            {isFetchingNextPage ? (
              <p>Loading more conversations...</p>
            ) : hasNextPage ? null : (
              <p className="text-tag-text">No more conversations to load</p>
            )}
          </div>
        </div>
      </section>
      <Aside className={"hidden sm:block sm:w-1/3"} />
    </div>
  );
}
