import type { Comments } from "@/api/comments/querries";
import { TypographyH3 } from "./Typography";
import { ButtonIcon } from "./ButtonIcon";
import LikeIcon from "@/assets/like-icon.svg?react";
interface CommentProp {
  comm: Comments;
}
export const Comment = ({ comm }: CommentProp) => {
  return (
    <div
      key={comm.id}
      className="w-full flex flex-row justify-between items-end gap-3 rounded-2xl bg-bg-app p-3"
    >
      <div className="flex flex-col gap-3">
        <TypographyH3 className="text-black-text">
          {comm.user.fullName}
        </TypographyH3>
        <p>{comm.body}</p>
      </div>
      <ButtonIcon initialCount={comm.likes}>
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
    </div>
  );
};
