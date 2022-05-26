import Calendar from 'react-calendar'
import dayjs from 'dayjs'

type Props = {
  onChangeDate: Function
}

const EventCalendar: React.FC<Props> = ({ onChangeDate }) => {
  const handleDateChange = (date: Date) => {
    onChangeDate(date)
  }

  return (
    <>
      <div className='p-6 rounded-2xl border'>
        <Calendar onChange={handleDateChange} minDate={dayjs().add(1, 'day').toDate()} />
      </div>
    </>
  )
}

export default EventCalendar
