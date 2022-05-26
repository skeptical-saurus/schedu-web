import dayjs from 'dayjs'
import { useEffect } from 'react'
import Calendar from 'react-calendar'
import { Event } from 'types'

type Props = {
  selected: Date
  setSelected: Function,
  events?: Event[]
}

const PersonalCalendar: React.FC<Props> = ({ selected, setSelected, events }) => {
  
  useEffect(() => {
    generateEventTags()
  }, [events])

  const generateEventTags = () => {
    events?.forEach(event => {
      let date = dayjs(event.date).format('MMMM DD, YYYY')
      let dateElement = document.querySelector(`[aria-label="${date}"]`)
      if (!dateElement) return
      console.log(dateElement)
      dateElement.classList.add('relative')
      dateElement.innerHTML += `
        <div class="absolute -bottom-2 inset-x-0 flex justify-center">
          <div class="w-2 h-2 rounded-full bg-amber-600">&nbsp;</div>
        </div>
      `
    })
  }

  const handleDateChange = (date: Date) => {
    setSelected(date)
  }

  return (
    <>
      <div className='p-6 rounded-2xl border'>
        <Calendar onActiveStartDateChange={generateEventTags} onChange={handleDateChange} value={selected} />
      </div>
    </>
  )
}

export default PersonalCalendar
