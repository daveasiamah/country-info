import React from "react";
import { Country } from "../types/country";

type Props = {
  info: Country | null;
};

function SearchResult({ info }: any) {
  if (!info) {
    return <div>No information available</div>;
  }

  if (info.length > 0) {
    info = info[0];
    // console.log("SEARCH INFO: ", info);
  }

  // switch (info["type"]) {
  //   case "Country":
  //     console.log("COUNTRY INFO: ", info);
  //   case "State":
  //     console.log("STATE INFO: ", info);
  //   case "Continent":
  //     console.log("CONTINENT INFO: ", info);
  //   default:
  //     console.log("INFO: ", info.type);
  // }

  return (
    <div className="flex flex-col border p-8 ">
      <hr className="mb-4" />
      <h4>Time</h4>
      <h2>{info["type"]}</h2>
      <div className="flex gap-4 mt-6">
        <p className="text-3xl">{info?.data?.emoji}</p>
        <p className="text-3xl">{info?.data?.name}</p>
      </div>
      <div className="flex gap-4 text-2xl text-gray-500">
        <p className="text-xl">Day, Time</p>
        <p className="text-xl">Timezone</p>
      </div>
      <hr className="mt-4" />
      <h2 className="font-lg mt-4 text-xl">Other Information</h2>
      <div className="flex flex-col mt-4">
        <p>Currency:{info?.data?.currency}</p>
        <p>Emoji:{info?.data?.emoji}</p>
        <p>Phone:{info?.data?.phone}</p>
        {/* <p>languages:{info?.data?.languages[0].name}</p> */}
      </div>
    </div>
  );
}

export default SearchResult;
