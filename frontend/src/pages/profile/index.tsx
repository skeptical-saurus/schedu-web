import { useEffect, useState } from 'react'
import { AppointmentInformation } from 'types/appointment'
import { ContactInformation } from 'types/contact'
import { GET_CURRENT_ACCOUNT, GET_APPOINTMENTS } from 'lib/queries'
import { useQuery } from '@apollo/client'

import OngoingList from './components/ongoingList'
import RequestList from './components/RequestList'
import PersonalCalendar from './components/personalCalendar'
import UserInfo from './components/userInfo'
import DetailModal from './components/detailModal'
import ApproveModal from './components/approveModal'
import DenyModal from './components/denyModal'

const Profile: React.FC = () => {
  const [user, setUser] = useState<ContactInformation>()
  const [appointments, setAppointments] = useState<AppointmentInformation[]>()

  const userQuery = useQuery(GET_CURRENT_ACCOUNT)
  const appointmentQuery = useQuery(GET_APPOINTMENTS)

  const [requests, setRequests] = useState<AppointmentInformation[]>()
  const [ongoings, setOngoings] = useState<AppointmentInformation[]>()
  const [selected, setSelected] = useState<AppointmentInformation>()

  const [isDetailOpen, setDetailOpen] = useState(false)
  const [isApproveOpen, setApproveOpen] = useState(false)
  const [isDenyOpen, setDenyOpen] = useState(false)

  // useEffect(() => {
  //   setOngoings(mockedAppointments)
  //   setRequests(mockedAppointments)
  // }, [])

  useEffect(() => {
    const appointmentFilter = () => {
      const ongoingsFiltered = appointments
      // ?.filter(
      //   (appointment) => appointment.sender === user?._id
      // )

      const requestsFiltered = appointments
      // ?.filter((appointment) => {
      //   const isParticipant = appointment.participants?.find(({ userId }) => userId === user?._id)

      //   return appointment.sender !== user?._id && isParticipant
      // })

      setOngoings(ongoingsFiltered)
      setRequests(requestsFiltered)
      
      console.log('requests', requestsFiltered)
    }

    if (!userQuery.loading && !appointmentQuery.loading) {
      setUser(userQuery.data.currentAccount)
      setAppointments(appointmentQuery.data.appointments)
      appointmentFilter()
    }
    console.log(appointments)
  }, [userQuery, appointmentQuery, appointments, user])

  const openDetailModal = (apm: AppointmentInformation) => {
    setSelected(apm)
    setDetailOpen(true)
  }

  const openConfirmModal = (apm: AppointmentInformation, mode: string) => {
    setSelected(apm)
    switch (mode) {
      case 'APPROVE':
        return setApproveOpen(true)
      case 'DENY':
        return setDenyOpen(true)
    }
  }

  const handleDetailClose = () => {
    setDetailOpen(false)
  }
  const handleApproveClose = () => {
    setApproveOpen(false)
  }
  const handleDenyClose = () => {
    setDenyOpen(false)
  }

  return (
    <>
      <UserInfo user={user} />
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
            <RequestList
              appointments={requests}
              moreDetail={openDetailModal}
              submit={openConfirmModal}
            />
            <OngoingList appointments={ongoings} moreDetail={openDetailModal} />
          </div>
        </div>
      </div>
      <DetailModal appointment={selected} isOpen={isDetailOpen} close={handleDetailClose} />
      <ApproveModal appointment={selected} isOpen={isApproveOpen} close={handleApproveClose} />
      <DenyModal appointment={selected} isOpen={isDenyOpen} close={handleDenyClose} />
    </>
  )
}

export default Profile
