import { useState } from 'react'
import Calendar from 'react-calendar'

const EventCalendar: React.FC = () => {

  const [value, onChange] = useState(new Date())

  return (
    <>
      <div className='p-6 rounded-2xl border'>
        <Calendar onChange={onChange} value={value} />
      </div>
    </>
  )

}

export default EventCalendar