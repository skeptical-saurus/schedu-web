import { useState } from 'react'
import Calendar from 'react-calendar'

const EventCalendar: React.FC = () => {

  const [selected, changeDate] = useState<Date>()

  return (
    <>
      <div className='p-6 rounded-2xl border'>
        <Calendar onChange={changeDate} value={selected} />
      </div>
    </>
  )

}

export default EventCalendar