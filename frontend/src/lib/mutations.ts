import { gql } from '@apollo/client'

export const UPDATE_USER_PROFILE = gql`
    mutation updateAccount($record: UpdateOneAccountInput!) {
        updateAccount(record: $record) {
            record {
                firstName
                lastName
                contact{
                    email
                    tel
                }
            }
        }
    }
`