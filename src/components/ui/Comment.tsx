import { TypographyH3 } from "./Typography";
import { ButtonIcon } from "./ButtonIcon";
import LikeIcon from "@/assets/like-icon.svg?react";
import { ComponentProps } from "@/types/interfaces";
import { Comments } from "@/api/comments/queries";
export const Comment = ({ data }: ComponentProps<Comments>) => {
  return (
    <div
      key={data.id}
      className="w-full flex flex-row justify-between items-end gap-3 rounded-2xl bg-bg-app p-3"
    >
      <div className="flex flex-col gap-3">
        <TypographyH3 className="text-black-text">
          {data.user.fullName}
        </TypographyH3>
        <p>{data.body}</p>
      </div>
      <ButtonIcon initialCount={data.likes}>
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
