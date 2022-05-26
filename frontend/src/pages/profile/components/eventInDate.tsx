import dayjs from 'dayjs'
import { Appointment, Event } from 'types'

type Props = {
  selected: Date,
  events?: Event[],
  appointments?: Appointment[]
}

const EventInDate: React.FC<Props> = ({ selected, events, appointments }) => {
  return (
    <>
      <div className='border rounded-xl p-6 mt-8'>
        <div className='flex items-center justify-between mb-4'>
          <div className='text-xl font-light'>
            { dayjs(selected).format('DD MMM YYYY') }
          </div>
          <div className='text-gray-500 font-light'>
            {appointments ? appointments?.length : 0} รายการในวันนี้
          </div>
        </div>
        <div>
          {events?.map(event => (
            <span className='px-5 py-1 font-light text-xs rounded-full mr-2 bg-amber-300'>{event.title}</span>
          ))}
        </div>
      </div>
    </>
  )
}

export default EventInDate