// src/apollo.ts

import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
  };
});

const httpLink = new HttpLink({
  uri: process.env.HASURA_BASE_URL,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://" + process.env.HASURA_BASE_URL_WO_HTTP,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
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
