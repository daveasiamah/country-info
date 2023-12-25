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
        <h1 className="text-3xl font-bold pl-10 pt-10 text-orange-500">
          Countries Info
        </h1>
        <div className="flex flex-col md:flex-row p-10 h-['60lvh']">
          <div className="w-full md:w-1/3 border p-6">
            <SearchBar />
          </div>
          <div className="w-full border md:w-2/3 md:ml-4 mt-4 md:mt-0  p-2 flex-grow">
            <InteractiveMap />
          </div>
        </div>
      </CountryDataProvider>
    </ApolloProvider>
  );
}
