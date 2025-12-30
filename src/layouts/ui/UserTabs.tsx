import { useGetPostsByUserId } from "@/api/conversation/queries";
import { useAuth } from "@/app/context/UserContext";
import {
  Button,
  Post,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";
import PlusIcon from "@/assets/plus-icon.svg?react";
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
      <TabsContent value="posts" className="flex flex-col gap-5">
        <Button className="w-full rounded-2xl text-lg cursor-pointer">
          <PlusIcon />
          Start a New Conversation
        </Button>
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
