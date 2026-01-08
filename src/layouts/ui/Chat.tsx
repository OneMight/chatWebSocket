import { useAuth } from "@/app/context/UserContext";
import { Button, DropdownMenuContent, Input } from "@/components";
import { DropdownMenu, DropdownMenuTrigger } from "@/components";
import { gql, ApolloClient } from "@apollo/client";
import { useQuery, useMutation, useSubscription } from "@apollo/client/react";
import { useState } from "react";
import SendMessageIcon from "@/assets/send-message-icon.svg?react";
import { ChatView } from "./ChatView";
type Message = {
  id: string;
  username: string;
  data: string;
  created_at: string;
};
export type GetMessagesData = {
  messages: Message[];
};
type SendMessageData = {
  insert_messages_one: {
    id: string;
  };
};
type SendMessageVars = {
  user: string;
  content: string;
};

const GET_MESSAGES = gql`
  query GetMessages {
    messages(order_by: { created_at: asc }) {
      id
      username
      data
      created_at
    }
  }
`;
const MESSAGES_SUBSCRIPTION = gql`
  subscription OnMessageAdded {
    messages(order_by: { created_at: desc }, limit: 1) {
      id
      username
      data
    }
  }
`;
const POST_MESSAGE = gql`
  mutation SendMessage($user: String!, $content: String!) {
    insert_messages_one(object: { username: $user, data: $content }) {
      id
    }
  }
`;

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
        console.error("Ошибка при отправке:", err);
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
      console.error(e);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-black-text fixed bottom-4 right-4 cursor-pointer w-12 rounded-full bg-bg-button p-2">
        <SendMessageIcon className="w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <div className="w-80 flex flex-col gap-4 p-4 rounded bg-white-color">
          <ChatView data={data} />
          <div className="flex gap-2">
            <Input
              id="SendMessage"
              className="border p-2 flex-1 rounded text-black"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button
              onClick={handleSend}
              className="bg-bg-button h-full cursor-pointer p-2 rounded hover:bg-hover-orange transition"
            >
              Send
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
