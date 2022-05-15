import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PersonalInfo from './components/info/personalInfo'
import { ContactInformation } from 'interface/contact'

import jsonUsers from 'mock/users.json'
import EventCalendar from './components/info/eventCalendar'

type Props = {}

const ContactInfo: React.FC<Props> = () => {

  const router = useRouter()
  const { uid } = router.query

  const [contact, setContact] = useState<ContactInformation>()

  useEffect(() => {
    const getContactInfo = async () => {
      const result = jsonUsers.find(user => user.id === uid)
      setContact(result)
    }
    getContactInfo()
  }, [uid])

  // Contact is not successfully loaded or not found any
  if (!contact) return (
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
          <EventCalendar />
        </div>
      </div>
    </>
  )
}

export default ContactInfo