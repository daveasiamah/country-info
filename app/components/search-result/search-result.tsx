"use client";
import React from "react";
import { SearchResultProps } from "../../types/search-results";

function SearchResult({ info }: SearchResultProps) {
  const result = info[0];
  if (!result) {
    return <div>No information available</div>;
  }

  const formattedDateTime = result?.timezone?.datetime
    ? new Date(result?.timezone?.datetime)
    : null;
  const formattedTime = formattedDateTime
    ? `${formattedDateTime.toDateString().slice(0, 3)} ${formattedDateTime
        .toTimeString()
        .slice(0, 8)}`
    : "";

  return (
    <>
      <div className="flex flex-col border p-8 ">
        <hr className="mb-4" />
        <h2 className="text-xl">Time</h2>
        <div className="flex gap-4 mt-6">
          {result.type === "State" ? (
            <p className="text-3xl">{result?.parentCountry?.emoji}</p>
          ) : (
            <p className="text-3xl">{result?.data?.emoji}</p>
          )}
          <p className="text-3xl font-bold">{result?.data?.name}</p>
        </div>
        <div className="flex gap-4 text-2xl text-gray-500">
          <p className="text-xl">{formattedTime}</p>
          <p className="text-xl">
            {result?.timezone?.timezone_abbreviation}
            {result?.timezone?.gmt_offset}
          </p>
        </div>
        <hr className="mt-4" />
        <h2 className="font-bold mt-4 text-xl">Other Information</h2>
        <div className="flex flex-col mt-4 gap-3 w-full border">
          <h4 className="pl-3 text-xl">
            Currency:
            <span className="pl-2 text-gray-500">{result?.data?.currency}</span>
          </h4>
          <p className="pl-3 text-xl">
            Emoji:<span className="pl-2">{result?.data?.emoji}</span>
          </p>
          <p className="pl-3 text-xl">
            Phone:
            <span className="pl-2 text-gray-500">{result?.data?.phone}</span>
          </p>
          <p className="pl-3 text-xl">
            Languages:
            {result.type === "Country" || result.type === "State"
              ? result?.parentCountry?.languages?.map(
                  (language: any, index: number) => (
                    <span key={index} className="pl-2 text-gray-500">
                      {language.name},
                    </span>
                  )
                )
              : result?.data?.languages?.map((lan: any, index: number) => (
                  <span key={index} className="pl-2 text-gray-500">
                    {lan.name},
                  </span>
                ))}
          </p>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
