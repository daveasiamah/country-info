import React from "react";
import SearchBar from "../components/searchbar/main";
import SearchResult from "../search-result/main";
import InteractiveMap from "../components/interactive-map/main";

function Home() {
  return (
    <main className="flex flex-col p-10">
      <h1 className="text-2xl">Home Page</h1>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <div className="row-span-1 col-span-1  flex flex-col align-middle">
          <h2>Search country, states or continents </h2>
          <SearchBar />
          <SearchResult
            name={"Ghana"}
            native={""}
            phone={""}
            continent={""}
            capital={""}
            currency={""}
            languages={[]}
          />
        </div>
        <InteractiveMap />
      </div>
    </main>
  );
}

export default Home;
