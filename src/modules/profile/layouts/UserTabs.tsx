import { useGetPostsByUserId } from "@/core/api/conversation/queries";
import { useAuth } from "@/app/context/UserContext";
import {
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/core/index";
import { Post } from "@/modules/conservation/index";
import { CreateConversation } from "@/core/index";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/core/routes/routesPath";
export const UserTabs = () => {
  const context = useAuth();
  const { posts, isLoading } = useGetPostsByUserId(context.user?.id || null);

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
              <Post data={post} />
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
