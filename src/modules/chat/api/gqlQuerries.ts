import { gql } from "@apollo/client";

export type Message = {
  id: string;
  username: string;
  data: string;
  created_at: string;
};
export type GetMessagesData = {
  messages: Message[];
};
export type SendMessageData = {
  insert_messages_one: {
    id: string;
  };
};
export type SendMessageVars = {
  user: string;
  content: string;
};

export const GET_MESSAGES = gql`
  query GetMessages {
    messages(order_by: { created_at: asc }) {
      id
      username
      data
      created_at
    }
  }
`;
export const MESSAGES_SUBSCRIPTION = gql`
  subscription OnMessageAdded {
    messages(order_by: { created_at: desc }, limit: 1) {
      id
      username
      data
    }
  }
`;
export const POST_MESSAGE = gql`
  mutation SendMessage($user: String!, $content: String!) {
    insert_messages_one(object: { username: $user, data: $content }) {
      id
    }
  }
`;
