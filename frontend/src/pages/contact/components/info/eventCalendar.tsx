import Calendar from 'react-calendar'

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
        <Calendar onChange={handleDateChange} minDate={new Date()} />
      </div>
    </>
  )
}

export default EventCalendar
