import { gql } from "@apollo/client";

export const GET_COUNTRY = gql`
query countries($regex: String){
    countries(filter:{code:{regex:$regex}}){
        code
        name
        continent{
            name
        }
        phone
        currency
        language{
            name
        }
        emoji
        states{
            name
        }
    }
}
`