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
      role
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
      role
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
      role
      contact {
        email
        tel
      }
      setting {
        weekendReceive
        activeTime {
          startAt
          endAt
        }
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
      role
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

export const GET_PROFILE_DATA = gql`
  query profileData {
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
    currentAccount {
      _id
      googleId
      businessId
      firstName
      lastName
      image
      role
      contact {
        email
        tel
      }
    }
    events {
      _id
      title
      date
    }
  }
`
