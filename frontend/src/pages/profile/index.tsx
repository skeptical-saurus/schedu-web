import { useEffect, useState } from 'react'
import { AppointmentInformation } from 'types/appointment'
import OngoingList from './components/ongoingList'
import RequestList from './components/RequestList'
import PersonalCalendar from './components/personalCalendar'
import UserInfo from './components/userInfo'

import mockedAppointments from 'mock/appointments.json'
import DetailModal from './components/detailModal'
import ApproveModal from './components/approveModal'
import DenyModal from './components/denyModal'

const Profile: React.FC = () => {

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

  const openDetailModal = (apm: AppointmentInformation) => {
    setSelected(apm)
    // TODO: open modal with appointment detail
  }

  const openConfirmModal = (apm: AppointmentInformation, mode: string) => {
    setSelected(apm)
    switch (mode) {
      case 'APPROVE': return setApproveOpen(true)
      case 'DENY': return setDenyOpen(true)
    }
  }

  const handleDetailClose = () => { setDetailOpen(false) }
  const handleApproveClose = () => { setApproveOpen(false) }
  const handleDenyClose = () => { setDenyOpen(false) }

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
            <RequestList appointments={requests} moreDetail={openDetailModal} submit={openConfirmModal} />
            <OngoingList appointments={ongoings} moreDetail={openDetailModal} />
          </div>
        </div>
      </div>
      <DetailModal appointment={selected} />
      <ApproveModal appointment={selected} isOpen={isApproveOpen} close={handleApproveClose} />
      <DenyModal appointment={selected} isOpen={isDenyOpen} close={handleDenyClose} />
    </>
  )
}

export default Profile
