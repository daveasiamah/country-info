"use client";

import React from "react";

function SearchBar() {
  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit} className="inline-flex">
      <input
        type="text"
        placeholder="Country name, state name, continent name..."
        className="text-md text-gray-800 w-full bg-gray-200 mt-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-2 focus:ring-offset-gray-200 transition-all duration-200 ease-in-out hover:bg- border-2 border-gray-400 rounded-lg px-2 py-3"
      />
    </form>
  );
}

export default SearchBar;
