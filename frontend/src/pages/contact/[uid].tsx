import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PersonalInfo from './components/info/personalInfo'
import { Account, Query } from 'types'

import EventCalendar from './components/info/eventCalendar'
import DateInfo from './components/info/dateInfo'

import { GET_ACCOUNT_BY_ID } from 'lib/queries'
import { useQuery } from '@apollo/client'

type Props = {}

const ContactInfo: React.FC<Props> = () => {
  const router = useRouter()
  const { uid } = router.query

  const [selectedDate, setSelectedDate] = useState<Date>()

  const { loading, data } = useQuery<Query>(GET_ACCOUNT_BY_ID, { variables: { accountId: uid } })

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
          <DateInfo date={selectedDate} />
        </div>
      </div>
    </>
  )
}

export default ContactInfo
