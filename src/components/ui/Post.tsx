import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import type { PostData } from "@/api/conversation/queries";
import { useGetImageOfUser } from "@/api/users/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LikeIcon from "@/assets/like-icon.svg?react";
import DislikeIcon from "@/assets/dislike-icon.svg?react";
import { ButtonIcon } from "./ButtonIcon";

interface PostProps {
  post: PostData;
}

export function Post({ post }: PostProps) {
  const { data, isLoading } = useGetImageOfUser(post.userId);
  if (isLoading) {
    return <p>loading</p>;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-black-text flex flex-row gap-2 items-center">
          <Avatar>
            <AvatarImage alt="user-image" src={data?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {data?.username}
        </CardTitle>
        <CardDescription>{post?.title}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p>{post.body}</p>
        <div className="flex flex-row gap-3 items-center">
          {post.tags.map((tag, index) => (
            <div key={index} className="bg-tag-bg rounded-xl py-1 px-3">
              <p className="text-tag-text ">{tag}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <ButtonIcon initialCount={post.reactions.likes}>
          {(isActive) => (
            <LikeIcon
              aria-label="like-icon"
              className={`size-5 transition-colors${
                isActive
                  ? "fill-red-600  stroke-red-600"
                  : "fill-transparent stroke-black"
              }`}
            />
          )}
        </ButtonIcon>

        <ButtonIcon initialCount={post.reactions.dislikes}>
          {(isActive) => (
            <DislikeIcon
              aria-label="dislike-icon"
              className={`size-5 transition-colors ${
                isActive
                  ? "fill-black stroke-black"
                  : "fill-transparent stroke-gray-500"
              }`}
            />
          )}
        </ButtonIcon>
      </CardFooter>
    </Card>
  );
}
