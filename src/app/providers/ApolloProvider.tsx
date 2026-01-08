import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { ApolloProvider } from "@apollo/client/react";

const HASURA_URL = "https://top-python-84.hasura.app/v1/graphql";
const HASURA_WS_URL = "wss://top-python-84.hasura.app/v1/graphql";

const httpLink = new HttpLink({
  uri: HASURA_URL,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: HASURA_WS_URL,
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default function ProviderApollo({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
