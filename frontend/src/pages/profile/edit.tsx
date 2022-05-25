import { Query } from 'types'
import UserForm from './components/userForm'

import { GET_CURRENT_ACCOUNT } from 'lib/queries'
import { useQuery } from '@apollo/client'

const EditProfile: React.FC = () => {
  const { loading, data } = useQuery<Query>(GET_CURRENT_ACCOUNT)

  return (
    <>
      <UserForm user={data?.currentAccount} />
    </>
  )
}

export default EditProfile
