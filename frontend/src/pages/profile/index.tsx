import { useEffect, useState } from 'react'
import { AppointmentInformation } from 'types/appointment'
import AppointmentList from './components/AppointmentList'
import PersonalCalendar from './components/personalCalendar'
import RequestList from './components/RequestList'
import UserInfo from './components/userInfo'

import mockedAppointments from 'mock/appointments.json'

const Profile: React.FC = () => {

  const [requests, setRequests] = useState<AppointmentInformation[]>()
  const [ongoings, setOngoings] = useState<AppointmentInformation[]>()

  useEffect(() => {
    // TODO: Filter request out of ongoing appointments
    setOngoings(mockedAppointments)
    setRequests(mockedAppointments)
  })

  return (
    <>
      <UserInfo />
      <div className='mt-24'>
        <div className='flex items-center mb-6'>
          <span className='material-icons text-3xl'>calendar_month</span>
          <span className='ml-2 text-2xl font-light'>ปฏิทินของคุณ</span>
        </div>
        <div className='grid grid-cols-2 gap-8'>
          <div>
            <PersonalCalendar />
          </div>
          <div>
            <RequestList appointments={requests} />
            <AppointmentList appointments={ongoings} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
