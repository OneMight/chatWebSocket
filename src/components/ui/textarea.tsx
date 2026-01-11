import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./Button";
import SendIcon from "@/assets/send-icon.svg?react";
import { useState, type ChangeEvent } from "react";
import { postComment } from "@/api/comments/queries";
import { useAuth } from "@/app/context/UserContext";
import { useParams } from "@tanstack/react-router";
import { ROUTES } from "@/routes/routesPath";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  const [input, setInput] = useState<string>("");
  const { postId } = useParams({ from: ROUTES.POSTPAGE });
  const handleSetInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  const context = useAuth();
  const handleOnClick = () => {
    if (context.user) {
      postComment({
        body: input,
        userId: context.user.id,
        postId: postId,
      });
    }
  };
  return (
    <div className="relative w-full">
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "relative",
          className,
        )}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleSetInput(e)}
        {...props}
      />
      <Button
        className="absolute bottom-1 right-1 rounded-xl"
        onClick={handleOnClick}
      >
        <SendIcon />
      </Button>
    </div>
  );
}

export { Textarea };
