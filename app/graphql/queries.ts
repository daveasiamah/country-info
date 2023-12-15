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
export const GET_COUNTRY = gql`
  query country($code: ID!) {
    country(code: $code) {
      code
      name
      continent {
        name
      }
      native
      phone
      capital
      currency
      languages {
        name
      }
      states {
        name
      }
    }
  }
`;

export const GET_COUNTRIES = gql`
  query Countries {
    countries {
      name
    }
  }
`;

export const GET_STATES = gql`
  query States {
    countries {
      states {
        code
        name
      }
    }
  }
`;

export const GET_CONTINENTS = gql`
query Continents {
    continents {
      code
      name
    }
  }`
