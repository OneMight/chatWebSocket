import { useAuth } from "@/app/context/UserContext";
import { Button, Input } from "@/components";
import { DropdownComponents } from "@/components";
import { ApolloClient } from "@apollo/client";
import { useQuery, useMutation, useSubscription } from "@apollo/client/react";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import SendMessageIcon from "@/assets/send-message-icon.svg?react";
import { ChatView } from "./ChatView";
import {
  GET_MESSAGES,
  GetMessagesData,
  MESSAGES_SUBSCRIPTION,
  POST_MESSAGE,
  SendMessageData,
  SendMessageVars,
} from "@/api/chat/gqlQuerries";

export const Chat = () => {
  const context = useAuth();
  const [messageContent, setMessageContent] = useState("");
  const { data, refetch } = useQuery<GetMessagesData>(GET_MESSAGES);
  const [postMessage] = useMutation<SendMessageData, SendMessageVars>(
    POST_MESSAGE,
    {
      onCompleted: () => {
        refetch();
      },
      onError: (err) => {
        throw new Error(`Ошибка при отправке: ${err}`);
      },
    },
  );

  useSubscription(MESSAGES_SUBSCRIPTION, {
    onData: ({ client }: { client: ApolloClient }) => {
      client.refetchQueries({ include: [GET_MESSAGES] });
    },
  });

  const handleSend = async () => {
    if (!messageContent.trim()) return;
    try {
      await postMessage({
        variables: {
          user: context?.user?.username || "Guest",
          content: messageContent,
        },
      });
      setMessageContent("");
    } catch (e) {
      throw new Error(e as string);
    }
  };

  return (
    <DropdownComponents.DropdownMenu>
      <DropdownComponents.DropdownMenuTrigger className="text-black-text fixed bottom-4 right-4 cursor-pointer w-12 rounded-full bg-bg-button p-2 z-20">
        <SendMessageIcon className="w-8" />
      </DropdownComponents.DropdownMenuTrigger>
      <DropdownComponents.DropdownMenuContent className="p-0">
        <div className="w-80 flex flex-col gap-4 p-4 rounded bg-white-color">
          {data && <ChatView data={data} />}
          <div className="flex gap-2">
            <Input
              id="SendMessage"
              className="border p-2 flex-1 rounded text-black"
              value={messageContent}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMessageContent(e.target.value)
              }
              placeholder="Type a message..."
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                e.key === "Enter" && handleSend()
              }
            />
            <Button
              onClick={handleSend}
              className="bg-bg-button h-full cursor-pointer p-2 rounded hover:bg-hover-orange transition"
            >
              Send
            </Button>
          </div>
        </div>
      </DropdownComponents.DropdownMenuContent>
    </DropdownComponents.DropdownMenu>
  );
};
