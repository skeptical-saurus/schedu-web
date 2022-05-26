import { gql } from '@apollo/client'

export const UPDATE_USER_PROFILE = gql`
  mutation updateAccount($record: UpdateOneAccountInput!) {
    updateAccount(record: $record) {
      record {
        firstName
        lastName
        contact {
          email
          tel
        }
      }
    }
  }
`

export const CREATE_APPOINTMENT = gql`
  mutation createAppointment($record: CreateOneAppointmentInput!) {
    createAppointment(record: $record) {
      record {
        _id
      }
    }
  }
`
export const APPROVE_APPOINTMENT = gql`
  mutation approveAppointment($_id: MongoID!) {
    approveAppointment(_id: $_id) {
      recordId
    }
  }
`

export const REJECT_APPOINTMENT = gql`
mutation rejectAppointment($_id: MongoID!) {
  rejectAppointment(_id: $_id) {
    recordId
  }
}
`
