import dayjs, { Dayjs } from 'dayjs'
import { useEffect } from 'react'
import Calendar from 'react-calendar'
import { Appointment, Event } from 'types'

type Props = {
  selected: Date
  setSelected: Function,
  events?: Event[],
  appointments?: Appointment[]
}

const PersonalCalendar: React.FC<Props> = ({ selected, setSelected, events, appointments }) => {
  
  useEffect(() => {
    generateTags()
  }, [events])

  const generateTags = () => {

    const getDateElement = (dateString: string) => {
      let date = dayjs(dateString).format('MMMM DD, YYYY')
      let dateElement = document.querySelector(`[aria-label="${date}"]`)
      return dateElement
    }

    const initiateDotContainer = (dateElement: Element) => {
      let isRelativeParent = dateElement.classList.contains('relative')
      if (!isRelativeParent) dateElement.classList.add('relative') 

      let dotContainer = dateElement.getElementsByClassName('dot-container')[0]
      if (dotContainer) return dotContainer

      dateElement.innerHTML += `<div class="dot-container absolute -bottom-2 inset-x-0 flex justify-center"></div>`
      return dateElement.getElementsByClassName('dot-container')[0]
    }

    events?.forEach(event => {
      let dateElement = getDateElement(event.date as string)
      if (!dateElement) return
      let dotContainer = initiateDotContainer(dateElement)
      dotContainer.innerHTML = `<div class="w-2 h-2 rounded-full bg-amber-600 mx-0.5">&nbsp;</div>`
    })

    appointments?.forEach(apm => {
      let dateElement = getDateElement(apm.startAt as string)
      if (!dateElement) return
      let dotContainer = initiateDotContainer(dateElement)
      dotContainer.innerHTML = `<div class="w-2 h-2 rounded-full bg-[color:var(--light-blue)] mx-0.5">&nbsp;</div>`
    })

  }

  const handleDateChange = (date: Date) => {
    setSelected(date)
  }

  return (
    <>
      <div className='p-6 rounded-2xl border'>
        <Calendar onActiveStartDateChange={generateTags} onChange={handleDateChange} value={selected} />
      </div>
    </>
  )
}

export default PersonalCalendar
