import { useEffect, useState } from 'react'
import { Appointment, Query } from 'types'
import { GET_APPOINTMENTS_AND_CURRENT_ACCOUNT } from 'lib/queries'
import { useQuery } from '@apollo/client'

import OngoingList from './components/ongoingList'
import RequestList from './components/RequestList'
import PersonalCalendar from './components/personalCalendar'
import UserInfo from './components/userInfo'
import DetailModal from './components/detailModal'
import ApproveModal from './components/approveModal'
import DenyModal from './components/denyModal'
import { useRouter } from 'next/router'

const Profile: React.FC = () => {
  const router = useRouter()
  const { apmId } = router.query
  const { loading, data } = useQuery<Query>(GET_APPOINTMENTS_AND_CURRENT_ACCOUNT)

  const [requests, setRequests] = useState<Appointment[]>()
  const [ongoings, setOngoings] = useState<Appointment[]>()
  const [selected, setSelected] = useState<Appointment>()

  const [isDetailOpen, setDetailOpen] = useState(false)
  const [isApproveOpen, setApproveOpen] = useState(false)
  const [isDenyOpen, setDenyOpen] = useState(false)

  useEffect(() => {
    if (apmId?.length === 1) {
      if (!isDetailOpen) {
        const createdAppointment = data?.appointments?.find(
          (appointment) => appointment._id === apmId[0]
        )
        if (createdAppointment) openDetailModal(createdAppointment)
      } else {
        router.replace('/profile')
      }
    }
  }, [apmId, data?.appointments, router, isDetailOpen])

  useEffect(() => {
    const appointmentFilter = () => {
      const ongoingsFiltered = data?.appointments?.filter(
        (appointment) => appointment.sender === data.currentAccount?._id
      )

      const requestsFiltered = data?.appointments?.filter((appointment) => {
        const isParticipant = appointment.participants?.find(
          (userId) => userId === data.currentAccount?._id
        )

        return appointment.sender !== data.currentAccount?._id && isParticipant
      })

      setOngoings(ongoingsFiltered)
      setRequests(requestsFiltered)
    }

    if (!loading) {
      appointmentFilter()
    }
  }, [loading, data])

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
