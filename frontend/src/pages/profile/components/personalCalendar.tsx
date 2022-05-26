import Calendar from 'react-calendar'

type Props = {
  selected: Date
  setSelected: Function
}

const PersonalCalendar: React.FC<Props> = ({ selected, setSelected }) => {
  const handleDateChange = (date: Date) => {
    setSelected(date)
  }

  return (
    <>
      <div className='p-6 rounded-2xl border'>
        <Calendar onChange={handleDateChange} value={selected} />
      </div>
    </>
  )
}

export default PersonalCalendar
