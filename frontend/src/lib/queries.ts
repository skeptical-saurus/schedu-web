import { gql } from '@apollo/client'

export const GET_ACCOUNTS = gql`
  query accounts {
    accounts {
      _id
      googleId
      businessId
      firstName
      lastName
      image
      contact {
        email
        tel
      }
    }
  }
`

export const GET_ACCOUNT_BY_ID = gql`
  query account($accountId: MongoID!) {
    account(_id: $accountId) {
      _id
      googleId
      businessId
      firstName
      lastName
      image
      contact {
        email
        tel
      }
    }
  }
`
