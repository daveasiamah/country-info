import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SearchResult from "@/app/search-result/search-result";
import { useLazyQuery } from "@apollo/client";
import { COUNTRIES_QUERY } from "@/app/graphql/queries";
import { Country } from "@/app/types/country";
import { match } from "assert";

const SearchBar = () => {
  const [searchCountry, { loading, error, data }] = useLazyQuery<{
    countries: Country[];
  }>(COUNTRIES_QUERY);
  const [matches, setMatches] = useState<
    { type: string; data: any; parentCountry?: any }[]
  >([]);
  const searchBarRef = useRef<HTMLInputElement>(null);

  const searchInResponse = (
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
  };

  const formik = useFormik({
    initialValues: {
      searchString: "",
    },
    validationSchema: Yup.object({
      searchString: Yup.string()
        .min(2, "Must be at least 2 characters")
        .required("Required"),
    }),
    onSubmit: (values: { searchString: string }) => {
      const matches = searchInResponse(
        data?.countries || [],
        values.searchString
      );
      setMatches(matches);
      console.log("MATCHES:", matches);
      formik.resetForm();
    },
  });

  useEffect(() => {
    searchCountry();
  }, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col">
        <input
          type="search"
          placeholder="Country name, state name, continent name..."
          className="text-md text-gray-800 w-full bg-gray-100 mt-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-transparent focus:ring-offset-2 focus:ring-offset-gray-200 transition-all duration-200 ease-in-out hover:bg- border-2 border-gray-400 rounded-lg px-2 py-3"
          name="searchString"
          value={formik.values.searchString}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          ref={searchBarRef}
        />
        {formik.touched.searchString && formik.errors.searchString ? (
          <div className="text-red-800 mb-4">
            {formik.errors.searchString?.toString()}
          </div>
        ) : null}
      </form>
      {error && <div>Error: {error.message}</div>}
      {loading ? <h1>Loading...</h1> : <SearchResult info={...matches} />}
    </>
  );
};

export default SearchBar;
