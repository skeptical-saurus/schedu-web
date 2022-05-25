import { useEffect, useState } from 'react'
import { Appointment, Query } from 'types'
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
  const { loading, data } = useQuery<Query>(GET_CURRENT_ACCOUNT)

  const [requests, setRequests] = useState<Appointment[]>()
  const [ongoings, setOngoings] = useState<Appointment[]>()
  const [selected, setSelected] = useState<Appointment>()

  const [isDetailOpen, setDetailOpen] = useState(false)
  const [isApproveOpen, setApproveOpen] = useState(false)
  const [isDenyOpen, setDenyOpen] = useState(false)

  useEffect(() => {
    setOngoings(mockedAppointments)
    setRequests(mockedAppointments)
  }, [])

  const openDetailModal = (apm: Appointment) => {
    setSelected(apm)
    setDetailOpen(true)
  }

  const openConfirmModal = (apm: Appointment, mode: string) => {
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
      <UserInfo user={data?.currentAccount} />
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
