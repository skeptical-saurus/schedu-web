import { useEffect, useState } from 'react'
import { Appointment, Event, Query } from 'types'
import { GET_APPOINTMENTS_AND_CURRENT_ACCOUNT, GET_EVENTS } from 'lib/queries'
import { useQuery } from '@apollo/client'

import OngoingList from './components/ongoingList'
import RequestList from './components/requestList'
import PersonalCalendar from './components/personalCalendar'
import UserInfo from './components/userInfo'
import DetailModal from './components/detailModal'
import ApproveModal from './components/approveModal'
import DenyModal from './components/denyModal'
import EventInDate from './components/eventInDate'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

const REQUEST_STATUS = ['pending', 'ongoing']
const ONGOING_STATUS = ['pending', 'ongoing', 'starting']
const DONE_STATUS = ['abandoned', 'done']

const Profile: React.FC = () => {
  const router = useRouter()
  const { apmId } = router.query
  const { loading, data } = useQuery<Query>(GET_APPOINTMENTS_AND_CURRENT_ACCOUNT)
  const { loading: eventLoading, data: eventData } = useQuery<Query>(GET_EVENTS)

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [onDateEvents, setOnDateEvents] = useState<Event[]>()

  const [onDateAppointments, setOnDateAppointments] = useState<Appointment[]>([])
  const [requests, setRequests] = useState<Appointment[]>()
  const [ongoings, setOngoings] = useState<Appointment[]>()
  const [selected, setSelected] = useState<Appointment>()

  const [isDetailOpen, setDetailOpen] = useState(false)
  const [isApproveOpen, setApproveOpen] = useState(false)
  const [isDenyOpen, setDenyOpen] = useState(false)

  useEffect(() => {
    let eventsOnDate = eventData?.events?.filter((event) => {
      return !dayjs(event.date).startOf('day').diff(dayjs(selectedDate), 'days')
    })
    console.log(eventsOnDate)
    if (!eventsOnDate) eventsOnDate = []
    setOnDateEvents(eventsOnDate)

    let appointmentsOnDate = data?.appointments?.filter((appointment) => {
      return !dayjs(appointment.startAt).startOf('day').diff(dayjs(selectedDate), 'days')
    })
    if (!appointmentsOnDate) appointmentsOnDate = []
    setOnDateAppointments(appointmentsOnDate)
  }, [selectedDate])

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

  // Filter appointments
  useEffect(() => {
    const appointmentFilter = () => {
      let requestsFiltered = data?.appointments?.filter((appointment) => {
        // status matched with requested statuses
        let isRequestStatus = appointment.status
          ? REQUEST_STATUS.includes(appointment.status)
          : false
        // status not in done statuses
        let isNotDoneYet = appointment.status ? !DONE_STATUS.includes(appointment.status) : false
        // user is not a sender
        let isNotSender = appointment.sender !== data.currentAccount?._id
        // user is a participant of this appointment
        let isParticipant = appointment.participants?.find(
          (participant) => participant?.userId === data.currentAccount?._id
        )
        return isRequestStatus && isNotDoneYet && isNotSender && isParticipant
      })

      let ongoingsFiltered = data?.appointments?.filter((appointment) => {
        // status matched with ongoing statuses
        let isOngoingStatus = appointment.status
          ? ONGOING_STATUS.includes(appointment.status)
          : false
        // status not in done statuses
        let isNotDoneYet = appointment.status ? !DONE_STATUS.includes(appointment.status) : false
        // user is a sender
        let isSender = appointment.sender === data.currentAccount?._id
        // user, as a participant, is accepted
        let isAcceptedAsParticipant = appointment.participants?.find((participant) => {
          let matchUserId = participant?.userId === data.currentAccount?._id
          let isConfirmed = participant?.confirmed
          return matchUserId && isConfirmed
        })
        return isOngoingStatus && isNotDoneYet && (isSender || isAcceptedAsParticipant)
      })

      setRequests(requestsFiltered)
      setOngoings(ongoingsFiltered)
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
            <PersonalCalendar selected={selectedDate} setSelected={setSelectedDate} events={eventData?.events} appointments={data?.appointments} />
            <EventInDate
              selected={selectedDate}
              events={onDateEvents}
              appointments={onDateAppointments}
            />
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
