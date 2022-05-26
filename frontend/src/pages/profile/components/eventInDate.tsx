import dayjs from 'dayjs'
import { apmDuration, formatTime } from 'lib/timeFormatter'
import { Appointment, Event } from 'types'

type Props = {
  selected: Date,
  events?: Event[],
  appointments?: Appointment[]
}

const EventInDate: React.FC<Props> = ({ selected, events, appointments }) => {
  return (
    <>
      <div className='border rounded-xl p-8 mt-8'>
        <div className='flex items-center justify-between'>
          <div className='text-xl font-light'>
            { dayjs(selected).format('DD MMM YYYY') }
          </div>
          <div className='text-gray-500 font-light'>
            {appointments ? appointments?.length : 0} รายการในวันนี้
          </div>
        </div>
        <div>
          {events?.map(event => (
            <span className='px-5 py-1 font-light text-xs rounded-full mr-2 mt-4 bg-amber-300'>{event.title}</span>
          ))}
        </div>
        <div>
          {appointments?.map(apm => (
            <div key={`ondate-${apm._id}`} className='grid grid-cols-5 py-3 border-b'>
              <div className='col-span-4'>
                <div className='truncate w-full mb-1'>{apm.subject}</div>
                <div className='font-light text-sm text-gray-600'>
                  <div className='mb-1'>
                    {formatTime(apm)} {apmDuration(apm)}
                  </div>
                  <div>สถานะ: {apm.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default EventInDate