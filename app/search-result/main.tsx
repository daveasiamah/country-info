import React from "react";
import Image from "next/image";

function SearchResult(country: Country) {
  console.log(country);
  return (
    <div className="flex flex-col mt-4">
      <hr className="mb-4" />
      <div className="flex flex-col">
        <h4>Time</h4>
        <Image
          src="/public/vercel.svg"
          alt="country emoji"
          width={20}
          height={20}
        />
        <h4>Other Information</h4>
        <h4>Timezone</h4>
      </div>
      <hr />
      <h2>Currency:</h2>
      <h2>Emoji </h2>
      <h2>Phone </h2>
      <h2>Languages</h2>
    </div>
  );
}

export default SearchResult;
