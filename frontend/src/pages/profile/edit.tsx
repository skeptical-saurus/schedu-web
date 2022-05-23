import { ContactInformation } from 'types/contact'
import { useState, useEffect } from 'react'
import UserForm from './components/userForm'

import { GET_CURRENT_ACCOUNT } from 'lib/queries'
import { useQuery } from '@apollo/client'

const EditProfile: React.FC = () => {
  const [user, setUser] = useState<ContactInformation>()

  const { loading, data } = useQuery(GET_CURRENT_ACCOUNT)

  useEffect(() => {
    if (!loading) {
      setUser(data.currentAccount)
    }
  }, [loading, data])

  return (
    <>
      <UserForm user={user} />
    </>
  )
}

export default EditProfile
