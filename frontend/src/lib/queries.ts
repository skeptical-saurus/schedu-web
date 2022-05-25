import { gql } from '@apollo/client'

export const GET_ACCOUNTS_AND_CONTACTS = gql`
  query {
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

export const GET_APPOINTMENTS = gql`
  query appointments {
    appointments {
      _id
      subject
      status
      sender
      participants {
        userId
        main
        confirmed
        join
      }
      startAt
      endAt
      commMethod
      commUrl
      note
    }
  }
`
