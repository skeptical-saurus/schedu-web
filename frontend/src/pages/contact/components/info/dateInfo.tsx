import { MouseEventHandler, useState } from 'react'
import dayjs from 'dayjs'
import TimeInput from './timeInput'

type Props = {
  date?: Date
}

const DateInfo: React.FC<Props> = ({ date }) => {
  let shownDate = date ? dayjs(date).format('DD MMMM YYYY') : '—'

  const [hour, setHour] = useState<number>()
  const [minute, setMinute] = useState<number>()
  const [range, setRange] = useState<number>()

  const hours = Array.from(Array(24).keys()).map((h) => h + 1)
  const minutes = [0, 15, 30, 45]

  const ranges = [15, 30, 45, 60, 90]

  const handleRangeSelect = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    let selected = event.currentTarget.dataset['range']
    if (!selected) setRange(undefined)
    else setRange(parseInt(selected))
  }

  const checkSelected = (comparator: number) => {
    return range === comparator
  }

  let validAppointmentDetail = !false

  const submit = () => {
    // TODO: Submit appointment request
  }

  return (
    <>
      <div className='grid grid-cols-3 my-8'>
        <div>
          <div className='text-sm mb-2 text-gray-500 flex items-center'>
            <span className='material-icons text-lg'>event_available</span>
            <span className='ml-1'>วันที่เลือก</span>
          </div>
          <div className='text-2xl font-light'>{shownDate}</div>
        </div>
        <div>
          <div className='text-sm mb-2 text-gray-500 flex items-center'>
            <span className='material-icons text-lg'>schedule</span>
            <span className='ml-1'>ช่วงเวลา (เริ่มต้น)</span>
          </div>
          <div className='grid grid-cols-2'>
            <div className='flex items-center'>
              <TimeInput times={hours} time={hour} setTime={setHour} />
              <div className='text-gray-400 mx-2'>:</div>
              <TimeInput times={minutes} time={minute} setTime={setMinute} />
            </div>
          </div>
        </div>
        <div>
          <div className='text-sm mb-2 text-gray-500 flex items-center'>
            <span className='material-icons text-lg'>more_horiz</span>
            <span className='ml-1'>ระยะเวลา</span>
          </div>
          <div className='grid grid-cols-3 gap-2 text-sm'>
            {ranges.map((range, index) => (
              <button
                onClick={handleRangeSelect}
                key={index}
                data-range={range}
                className={`border px-3 py-2 rounded-xl font-light duration-100 disabled:cursor-not-allowed disabled:text-gray-400 ${
                  checkSelected(range) ? 'border-emerald-600 text-emerald-600' : null
                }`}
                disabled
              >
                {range} นาที
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='text-right'>
        <button
          onClick={submit}
          className='px-16 py-4 rounded-xl shadow bg-[color:var(--light-blue)] hover:bg-[color:var(--blue)] disabled:bg-gray-400 disabled:opacity-75 disabled:cursor-not-allowed text-white duration-100 font-light'
          disabled={validAppointmentDetail}
        >
          ส่งคำขอ
        </button>
      </div>
    </>
  )
}

export default DateInfo
