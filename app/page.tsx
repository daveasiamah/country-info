"use client";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
  gql,
  useQuery,
} from "@apollo/client";

import Home from "./home/page";
import { useState, useEffect, useMemo, useCallback } from "react";
import useClientConnection from "./hooks/useClientConnection";
import { Country } from "./types/country-info";
const GET_COUNTRY = gql`
  query {
    country(code: "GH") {
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
`;
export default function App() {
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const client = useClientConnection();

  const getCountryData = useCallback(async () => {
    try {
      const response = await client?.query({
        query: GET_COUNTRY,
      });

      setCountry(response?.data.country);
    } catch (error) {
      console.error("Error fetching country data:", error);
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    getCountryData();
  }, [getCountryData]);

  if (loading) {
    return (
      <div className="flex justify-center align-middle">
        <h1 className="font-bold text-4xl text-blue-700">Loading...</h1>
      </div>
    );
  }

  console.log({ country });
  return (
    <ApolloProvider client={client as ApolloClient<NormalizedCacheObject>}>
      <Home results={country} />
    </ApolloProvider>
  );
}
