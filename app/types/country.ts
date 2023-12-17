type Language = {
    code: string;
    name: string;
  };
  
  type Continent = {
    code: string;
    name: string;
  };
  
  export type Country = {
    code: string;
    name: string;
    phone: string;
    currency: string;
    emoji: string;
    states: { code: string | null; name: string }[];
    continent: Continent;
    languages: Language[];
  };


  export type CountryData = {
    code:string;
    name:string;
  }