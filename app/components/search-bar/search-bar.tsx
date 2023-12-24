import React, { useState, useEffect, useRef, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SearchResult from "@/app/components/search-result/search-result";
import { useLazyQuery } from "@apollo/client";
import { COUNTRIES_QUERY } from "@/app/graphql/queries";
import { Country, CountryData } from "@/app/types/country";
import getTimezoneInfo from "./getTimeZoneInfo";
import { useCountryData } from "@/app/hooks/useCountryData";

interface InfoProp {
  type: string;
  data: any;
  parentCountry?: any;
  timezone: any;
}

const SearchBar = () => {
  const [searchCountry, { loading, error, data }] = useLazyQuery<{
    countries: Country[];
  }>(COUNTRIES_QUERY);
  const [matches, setMatches] = useState<InfoProp[]>([]);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const { countryData, updateCountryData } = useCountryData();

  const searchInResponse = useCallback(
    (
      response: Country[],
      searchString: string
    ): { type: string; data: any; parentCountry?: any }[] => {
      const matchingItems: { type: string; data: any; parentCountry?: any }[] =
        [];

      for (const country of response) {
        if (country.name.toLowerCase() === searchString.toLowerCase()) {
          matchingItems.push({
            type: "Country",
            data: country,
            parentCountry: country,
          });
        }

        if (country.states.length > 0) {
          const states = country.states;
          for (const state of states) {
            if (state.name.toLowerCase() === searchString.toLowerCase()) {
              matchingItems.push({
                type: "State",
                data: state,
                parentCountry: country,
              });
            }
          }
        }

        if (
          country.continent.name.toLowerCase() === searchString.toLowerCase() ||
          country.continent.code.toLowerCase() === searchString.toLowerCase()
        ) {
          matchingItems.push({
            type: "Continent",
            data: country.continent,
            parentCountry: country,
          });

          return matchingItems;
        }
      }
      return matchingItems;
    },
    []
  );

  const formik = useFormik({
    initialValues: {
      searchString: "",
    },
    validationSchema: Yup.object({
      searchString: Yup.string()
        .min(2, "Must be at least 2 characters")
        .required("Required"),
    }),
    onSubmit: async (values: { searchString: string }) => {
      const countriesResponse = data?.countries || [];
      const matches = searchInResponse(countriesResponse, values.searchString);

      try {
        const timezoneInfo = await getTimezoneInfo(values.searchString);
        const matchesWithTimezone = matches.map((matchItem) => ({
          ...matchItem,
          timezone: timezoneInfo,
        }));

        const mapCountryData: CountryData = {
          code: matches[0]?.data?.code || "",
          name: matches[0]?.data?.name || "",
        };

        const currentCountryData = countryData;
        const updatedCountryData = mapCountryData;
        updateCountryData(updatedCountryData);

        setMatches(matchesWithTimezone);
      } catch (error) {
        console.error("Error fetching timezone information:", error);

        setMatches([]);
        console.log("MATCHES:", matches);
      }

      formik.resetForm();
    },
  });

  useEffect(() => {
    searchCountry();
  }, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Country name, state name, continent name..."
            className="w-full py-2 px-4 outline-none text-gray-800"
            name="searchString"
            value={formik.values.searchString}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            ref={searchBarRef}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2"
            onClick={() => formik.handleSubmit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17l-5-5"
              />
            </svg>
          </button>
        </div>
        {formik.touched.searchString && formik.errors.searchString ? (
          <div className="text-red-800 mb-4 mt-2 ml-2">
            {formik.errors.searchString?.toString()}
          </div>
        ) : null}
      </form>
      {error && <div>Error: {error.message}</div>}
      {matches.length > 0 ? (
        <SearchResult info={matches} />
      ) : (
        <div className="border-2 mt-10 p-8 flex justify-center border-gray-100">
          <h2>No results found</h2>
        </div>
      )}
    </>
  );
};

export default SearchBar;
