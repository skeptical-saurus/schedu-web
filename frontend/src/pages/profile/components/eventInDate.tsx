import dayjs from 'dayjs'
import { colorizeStatus } from 'lib/statusColor'
import { apmDuration, formatTime } from 'lib/timeFormatter'
import { useEffect } from 'react'
import { Appointment, Event } from 'types'

type Props = {
  selected: Date
  events?: Event[]
  appointments?: Appointment[]
}

const EventInDate: React.FC<Props> = ({ selected, events, appointments }) => {
  useEffect(() => {
    console.log(appointments)
  }, [appointments])

  return (
    <>
      <div className='border rounded-xl p-8 mt-8'>
        <div className='flex items-center justify-between'>
          <div className='text-xl font-light'>{dayjs(selected).format('DD MMM YYYY')}</div>
          <div className='text-gray-500 font-light'>
            {appointments ? appointments?.length : 0} รายการในวันนี้
          </div>
        </div>
        <div className={`${events?.length ? 'mt-3' : ''}`}>
          {events?.map((event, index) => (
            <span
              key={`onevent-${index}`}
              className='px-5 py-1 font-light text-xs rounded-full mr-2 bg-amber-300'
            >
              {event.title}
            </span>
          ))}
        </div>
        <div>
          {appointments?.map((apm) => (
            <div key={`onapm-${apm._id}`} className='grid grid-cols-5 py-3 border-b'>
              <div className={`col-span-5 border-l-4 pl-3 ${colorizeStatus(apm.status as string)}`}>
                <div className='truncate w-full mb-1'>{apm.subject}</div>
                <div className='font-light text-sm text-gray-600'>
                  <div className='sm:flex items-center flex-wrap font-light text-sm text-gray-600'>
                    <div className='mr-2'>{formatTime(apm)}</div>
                    <div>{apmDuration(apm)}</div>
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
