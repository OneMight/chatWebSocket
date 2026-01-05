import { useGetPostsByUserId } from "@/api/conversation/queries";
import { useAuth } from "@/app/context/UserContext";
import {
  Post,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";

import { CreateConversation } from "..";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/routesPath";
export const UserTabs = () => {
  const context = useAuth();

  const { posts, isLoading } = useGetPostsByUserId(context?.user?.id);

  const allPosts = posts?.posts;
  if (isLoading || context.userLoading) {
    return <Spinner className="size-10" />;
  }
  return (
    <Tabs defaultValue="posts" className="w-full flex justify-start">
      <TabsList>
        <TabsTrigger className="cursor-pointer" value="posts">
          posts
        </TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="comments">
          comments
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts" className="flex flex-col gap-5">
        <CreateConversation />
        {allPosts ? (
          allPosts.map((post) => (
            <Link
              to={ROUTES.POSTPAGE}
              key={post.id}
              params={{ postId: String(post.id) }}
            >
              <Post post={post} />
            </Link>
          ))
        ) : (
          <p>This user never posted information</p>
        )}
      </TabsContent>
      <TabsContent value="comments"></TabsContent>
    </Tabs>
  );
};
