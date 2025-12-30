import { useGetPostsByUserId } from "@/api/conversation/queries";
import { useAuth } from "@/app/context/UserContext";
import { Post, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";

export const UserTabs = () => {
  const context = useAuth();
  const { posts, isLoading } = useGetPostsByUserId(context?.user?.id);
  if (isLoading) {
    return <p>loading</p>;
  }
  console.log(posts?.posts);

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
      <TabsContent value="posts">
        {posts?.posts ? (
          posts.posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <p>This user never posted information</p>
        )}
      </TabsContent>
      <TabsContent value="comments">
        {/* {data?.comments ? <></> : <p>This user never didn't write comments</p>} */}
      </TabsContent>
    </Tabs>
  );
};
