import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useGetImageOfUser } from "@/api/users/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LikeIcon from "@/assets/like-icon.svg?react";
import { ButtonIcon } from "./ButtonIcon";
import { PostData } from "@/api/conversation/queries";
import { ComponentProps } from "@/types/interfaces";
export function Post({ data }: ComponentProps<PostData>) {
  const { postData } = useGetImageOfUser(data.userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-black-text flex flex-row gap-2 items-center">
          <Avatar>
            <AvatarImage alt="user-image" src={postData?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {postData?.username}
        </CardTitle>
        <CardDescription>{data?.title}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p>{data.body}</p>
        <div className="flex flex-row gap-3 items-center">
          {data.tags.map((tag, index) => (
            <div key={index} className="bg-tag-bg rounded-xl py-1 px-3">
              <p className="text-tag-text ">{tag}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <ButtonIcon initialCount={data.reactions.likes}>
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
      </CardFooter>
    </Card>
  );
}
