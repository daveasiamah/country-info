"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import Home from "./home/page";

export default function App() {
  const client = new ApolloClient({
    uri: "https://countries.trevorblades.com/graphql",
    cache: new InMemoryCache(),
  });

  ({
    query: `
      query{
        country(code: "BR") {
          name
          native
          capital
          emoji
          currency
          languages {
            code
            name
          }
          phone
        }
      }      
    `,
  });

  console.log(client);

  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}
