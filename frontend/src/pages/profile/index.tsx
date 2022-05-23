import { useState, useEffect } from 'react'
import PersonalCalendar from './components/personalCalendar'
import UserInfo from './components/userInfo'

import { ContactInformation } from 'types/contact'
import { GET_CURRENT_ACCOUNT } from 'lib/queries'
import { useQuery } from '@apollo/client'

const Profile: React.FC = () => {
  const [user, setUser] = useState<ContactInformation>()

  const { loading, data } = useQuery(GET_CURRENT_ACCOUNT)

  useEffect(() => {
    // TODO: get user information
    if (!loading) {
      setUser(data.currentAccount)
    }
  }, [loading, data])
  return (
    <>
      <UserInfo user={user} />
      <div className='mt-24'>
        <div className='flex items-center mb-6'>
          <span className='material-icons text-3xl'>calendar_month</span>
          <span className='ml-2 text-2xl font-light'>ปฏิทินของคุณ</span>
        </div>
        <PersonalCalendar />
      </div>
    </>
  )
}

export default Profile
