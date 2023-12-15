import React from "react";
import { Country } from "../types/country-info";

type Props = {
  info: Country | null;
};

function SearchResult({ info }: Props) {
  if (!info) {
    return <div>No information available</div>;
  }

  const { name, currency, emoji, phone, languages } = info;

  console.log("Search Results:", info);

  return (
    <div className="flex flex-col border p-8 ">
      <hr className="mb-4" />
      <h4>Time</h4>
      <div className="flex gap-4 mt-6">
        <p className="text-3xl">{emoji}</p>
        <p className="text-3xl">{name}</p>
      </div>
      <div className="flex gap-4 text-2xl text-gray-500">
        <p className="text-xl">Day, Time</p>
        <p className="text-xl">Timezone</p>
      </div>
      <hr className="mt-4" />
      <h2 className="font-lg mt-4 text-xl">Other Information</h2>
      <div className="flex flex-col mt-4">
        <p>Currency:{currency}</p>
        <p>Emoji:{emoji}</p>
        <p>Phone:{phone}</p>
        <p>languages:{languages[0]["name"]}</p>
      </div>
    </div>
  );
}

export default SearchResult;
