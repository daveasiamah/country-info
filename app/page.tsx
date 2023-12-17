"use client";
import { useMemo } from "react";
import InteractiveMap from "./components/interactive-map/interactive-map";
import SearchBar from "./components/search-bar/search-bar";
import { CountryDataProvider } from "./hooks/useCountryData";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

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
      <CountryDataProvider>
        <main className="flex flex-col p-10">
          <h1 className="text-3xl font-bold">Countries Info</h1>
          <div className="flex flex-wrap">
            <div style={{ width: "660px" }}>
              <h2 className="mt-10 text-lg">
                Search countries, states, or continents
              </h2>
              <SearchBar />
            </div>
            <div className="flex flex-col md:flex-grow max-w-screen-lg">
              <InteractiveMap />
            </div>
          </div>
        </main>
      </CountryDataProvider>
    </ApolloProvider>
  );
}
