import { useEffect, useState } from 'react'
import { AppointmentInformation } from 'types/appointment'
import { ContactInformation } from 'types/contact'
import { GET_CURRENT_ACCOUNT } from 'lib/queries'
import { useQuery } from '@apollo/client'

import OngoingList from './components/ongoingList'
import RequestList from './components/RequestList'
import PersonalCalendar from './components/personalCalendar'
import UserInfo from './components/userInfo'
import DetailModal from './components/detailModal'
import ApproveModal from './components/approveModal'
import DenyModal from './components/denyModal'

import mockedAppointments from 'mock/appointments.json'

const Profile: React.FC = () => {
  const [user, setUser] = useState<ContactInformation>()
  const { loading, data } = useQuery(GET_CURRENT_ACCOUNT)

  const [requests, setRequests] = useState<AppointmentInformation[]>()
  const [ongoings, setOngoings] = useState<AppointmentInformation[]>()
  const [selected, setSelected] = useState<AppointmentInformation>()

  const [isDetailOpen, setDetailOpen] = useState(false)
  const [isApproveOpen, setApproveOpen] = useState(false)
  const [isDenyOpen, setDenyOpen] = useState(false)

  useEffect(() => {
    // TODO: Filter request out of ongoing appointments
    setOngoings(mockedAppointments)
    setRequests(mockedAppointments)
  })

  useEffect(() => {
    if (!loading) {
      setUser(data.currentAccount)
    }
  }, [loading, data])

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
