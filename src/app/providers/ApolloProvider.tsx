import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import type { QueryProps } from "./QueryProvider";

const client = new ApolloClient({
  link: new HttpLink({ uri: "wss://ws.ifelse.io" }),
  cache: new InMemoryCache(),
});

export default function ProviderApollo({ children }: QueryProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
