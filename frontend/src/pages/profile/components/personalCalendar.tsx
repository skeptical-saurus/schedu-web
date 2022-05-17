import Calendar from 'react-calendar'

const PersonalCalendar: React.FC = () => {
  const handleDateChange = (date: Date) => {
    console.log(date)
  }

  return (
    <>
      <div className='p-6 rounded-2xl border'>
        <Calendar onChange={handleDateChange} />
      </div>
    </>
  )
}
  
export default PersonalCalendar