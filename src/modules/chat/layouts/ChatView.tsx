import { useAuth } from "@/app/context/UserContext";
import { convertDate } from "@/modules/chat/libs/timeConvert";
import React from "react";
import { ComponentProps } from "@/core/types/interfaces";
import { type GetMessagesData } from "@/modules/chat/api/gqlQuerries";
export const ChatView = React.memo(
  ({ data }: ComponentProps<GetMessagesData>) => {
    const context = useAuth();
    return (
      <div className="h-64 overflow-y-auto border p-2 flex flex-col gap-2">
        {data?.messages.map((msg) => (
          <div key={msg.id}>
            <div
              className={`${msg.username === context.user?.username ? "bg-blue-300" : "bg-gray-100"} p-2 rounded h-auto`}
            >
              <span className="font-bold text-xs">{msg.username}</span>
              <p className="text-sm wrap-break-word">{msg.data}</p>
            </div>
            <span className="text-xs">{convertDate(msg.created_at)}</span>
          </div>
        ))}
      </div>
    );
  },
);
