import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PersonalInfo from './components/info/personalInfo'
import { ContactInformation } from 'types/contact'

import EventCalendar from './components/info/eventCalendar'
import DateInfo from './components/info/dateInfo'

import { GET_ACCOUNT_BY_ID } from 'lib/queries'
import { useQuery } from '@apollo/client'
import ConfirmModal from './components/info/confirmModal'
import { AppointmentInformation } from 'types/appointment'

type Props = {}

const ContactInfo: React.FC<Props> = () => {
  const router = useRouter()
  const { uid } = router.query

  const [contact, setContact] = useState<ContactInformation>()
  const [selectedDate, setSelectedDate] = useState<Date>()

  const [newAppointment, setNewAppointment] = useState<AppointmentInformation>()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const { loading, data } = useQuery(GET_ACCOUNT_BY_ID, { variables: { accountId: uid } })

  useEffect(() => {
    const getContactInfo = async () => {
      if (!loading) {
        setContact(data.account)
      }
    }
    getContactInfo()
  }, [loading, data])

  const handleAppoint = (apm: AppointmentInformation) => {
    setNewAppointment(apm)
    setIsConfirmOpen(true)
  }

  const handleConfirmClose = () => {
    setIsConfirmOpen(false)
  }

  // Contact is not successfully loaded or not found any
  if (!contact)
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
          <PersonalInfo contact={contact!} />
        </div>
        <div className='col-span-3'>
          <EventCalendar onChangeDate={setSelectedDate} />
          <DateInfo date={selectedDate} appoint={handleAppoint} />
        </div>
      </div>
      <ConfirmModal appointment={newAppointment} isOpen={isConfirmOpen} close={handleConfirmClose} />
    </>
  )
}

export default ContactInfo
