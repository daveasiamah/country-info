"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import Home from "./home/page";
import { useMemo } from "react";
import React from "react";

export default function App() {
  const client = useMemo(
    () =>
      new ApolloClient({
        uri: "https://countries.trevorblades.com/graphql",
        cache: new InMemoryCache(),
      }),
    []
  );

  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}
