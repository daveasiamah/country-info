"use client";
import { useMemo } from "react";
import InteractiveMap from "./components/interactive-map/interactive-map";
import SearchBar from "./components/search-bar/search-bar";
import { CountryDataProvider } from "./hooks/useCountryData";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./layout.css";

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
        <section className="main-container">
          <div className="left border">
            <SearchBar />
          </div>
          <div className="right border">
            <InteractiveMap />
          </div>
        </section>
      </CountryDataProvider>
    </ApolloProvider>
  );
}
