import { gql } from '@apollo/client'

export const GET_ACCOUNTS_AND_CONTACTS = gql`
  query accountAndContacts {
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
    recentContacts {
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
  query account($_id: MongoID!) {
    account(_id: $_id) {
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

export const GET_CURRENT_ACCOUNT = gql`
  query currentAccount {
    currentAccount {
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
