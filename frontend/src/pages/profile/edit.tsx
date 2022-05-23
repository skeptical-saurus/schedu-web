import { ContactInformation } from 'types/contact'
import { useState } from 'react'
import UserForm from './components/userForm'

const EditProfile: React.FC = () => {
  const [user, setUser] = useState<ContactInformation>()

  useState(() => {
    // TODO: get user information
  })

  return (
    <>
      <UserForm user={user} />
    </>
  )
}

export default EditProfile
