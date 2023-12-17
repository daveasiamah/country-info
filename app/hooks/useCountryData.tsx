"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

type CountryData = {
  code: string;
  name: string;
};

const defaultCountryData: CountryData[] = [];

type CountryContextType = {
  countryData: CountryData[];
  updateCountryData: React.Dispatch<React.SetStateAction<CountryData[]>>;
};

export const CountryDataContext = createContext<CountryContextType>({
  countryData: defaultCountryData,
  updateCountryData: () => {},
});

type CountryDataProviderProps = {
  children: ReactNode;
};

export const CountryDataProvider = ({ children }: CountryDataProviderProps) => {
  const [countryData, setCountryData] = useState(defaultCountryData);

  const updateCountryData = (data: React.SetStateAction<CountryData[]>) => {
    setCountryData(data);
  };

  return (
    <CountryDataContext.Provider value={{ countryData, updateCountryData }}>
      {children}
    </CountryDataContext.Provider>
  );
};

export const useCountryData = () => {
  return useContext(CountryDataContext);
};
