import InteractiveMap from "../components/interactive-map/interactive-map";
import SearchBar from "../components/search-bar/search-bar";
import { CountryDataProvider } from "../hooks/useCountryData";

function Home() {
  return (
    <CountryDataProvider>
      <main className="flex flex-col p-10">
        <h1 className="text-3xl font-bold">Countries Info</h1>
        <div className="flex flex-col md:flex-row md:gap-8">
          <div style={{ width: "660px" }}>
            <h2 className="mt-10 text-lg">
              Search countries, states, or continents
            </h2>
            <SearchBar />
          </div>
          <InteractiveMap />
          <div className="flex flex-col md:flex-grow"></div>
        </div>
      </main>
    </CountryDataProvider>
  );
}

export default Home;
