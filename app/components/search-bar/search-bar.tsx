"use client";
import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const SearchBar = () => {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchBarRef = useRef<HTMLInputElement>(null);

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
      console.log("Form submitted with:", values.searchString);

      setDebouncedSearch(values.searchString); // Update the debouncedSearch state with the new search string
      console.log("Debounced search:", debouncedSearch); // Log the debouncedSearch state to verify it's updated correctly
      formik.resetForm(); // Reset the form values and errors
      formik.setFieldValue("searchString", ""); // Reset the searchString field value
      formik.setTouched({ searchString: false });
      searchBarRef.current?.focus(); // Focus the searchbar input element after resetting the form
    },
  });

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearch(formik.values.searchString);
    }, 300);

    searchBarRef.current?.focus();
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [formik.values.searchString]);

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <input
        type="text"
        placeholder="Country name, state name, continent name..."
        className="text-md text-gray-800 w-full bg-gray-100 mt-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:border-transparent focus:ring-offset-2 focus:ring-offset-gray-200 transition-all duration-200 ease-in-out hover:bg- border-2 border-gray-400 rounded-lg px-2 py-3"
        name="searchString"
        value={formik.values.searchString}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        ref={searchBarRef}
      />
      {formik.touched.searchString && formik.errors.searchString ? (
        <div className="text-red-700">
          {formik.errors.searchString?.toString()}
        </div>
      ) : null}
    </form>
  );
};

export default SearchBar;
