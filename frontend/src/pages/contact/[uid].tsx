import { useRouter } from 'next/router'
import { useState } from 'react'
import PersonalInfo from './components/info/personalInfo'
import { CreateOneAppointmentInput, Query, QueryAccountArgs } from 'types'

import EventCalendar from './components/info/eventCalendar'
import DateInfo from './components/info/dateInfo'

import { GET_ACCOUNT_BY_ID } from 'lib/queries'
import { useQuery } from '@apollo/client'
import ConfirmModal from './components/info/confirmModal'

type Props = {}

const ContactInfo: React.FC<Props> = () => {
  const router = useRouter()
  const { uid } = router.query

  const [selectedDate, setSelectedDate] = useState<Date>()
  const [newAppointment, setNewAppointment] = useState<CreateOneAppointmentInput>()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const { loading, data } = useQuery<Query, QueryAccountArgs>(GET_ACCOUNT_BY_ID, { variables: { _id: uid } })

  const handleAppoint = (apm: CreateOneAppointmentInput) => {
    setNewAppointment(apm)
    setIsConfirmOpen(true)
  }

  const handleConfirmClose = () => {
    setIsConfirmOpen(false)
  }

  // Contact is not successfully loaded or not found any
  if (loading && !data?.account)
    return (
      <>
        <div className='text-center py-16 text-gray-500'>
          <span className='material-icons text-9xl animate-spin'>autorenew</span>
          <div className='font-light text-xl'>Loading ...</div>
        </div>
      </>
    )

  return (
    <>
      <div className='grid grid-cols-5 gap-16'>
        <div className='col-span-2'>
          <PersonalInfo contact={data?.account} />
        </div>
        <div className='col-span-3'>
          <EventCalendar onChangeDate={setSelectedDate} />
          <DateInfo date={selectedDate} appoint={handleAppoint} />
        </div>
      </div>
      <ConfirmModal
        appointment={newAppointment}
        isOpen={isConfirmOpen}
        close={handleConfirmClose}
      />
    </>
  )
}

export default ContactInfo
