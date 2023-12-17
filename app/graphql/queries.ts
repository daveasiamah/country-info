import { gql } from "@apollo/client";

export const COUNTRIES_QUERY = gql`
query CountriesQuery {
    countries {
      code
      name
      phone
      currency
      emoji
      states {
        code
        name
      }
      continent {
        code
        name
      }
      languages {
        code
        name
      }
    }
  }
`


