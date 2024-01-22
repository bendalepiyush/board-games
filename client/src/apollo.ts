// src/apollo.ts

import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";

const adminSecret =
  process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET ||
  "SmdA05TfU563hdync7KZuAG4W0nRKmuJKF4AaBf9dLG1nsS1JUsYmb9e14UkAhQT";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": adminSecret,
    },
  };
});

const httpLink = new HttpLink({
  uri: process.env.HASURA_BASE_URL || "http://localhost:8081/v1/graphql",
});

const wsurl: any = process.env.NEXT_PUBLIC_HASURA_BASE_URL_WO_HTTP
  ? "ws://" + process.env.NEXT_PUBLIC_HASURA_BASE_URL_WO_HTTP
  : "ws://localhost:8081/v1/graphql";

const wsLink = new GraphQLWsLink(
  createClient({
    url: wsurl,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": adminSecret,
      },
    },
  })
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
  authLink.concat(httpLink)
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
