"use client";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { useEffect, useState } from "react";

const useClientConnection = () => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    const newClient = new ApolloClient({
      uri: "https://countries.trevorblades.com/graphql",
      cache: new InMemoryCache(),
    });

    setClient(newClient);

    return () => {
      client?.stop();
    };
  }, [client]);

  return client;
};

export default useClientConnection;
