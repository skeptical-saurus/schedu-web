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

  const hours = Array.from(Array(24).keys()).map(h => (h + 1))
  const minutes = [0, 15, 30, 45]

  const ranges = [15, 30, 45, 60, 90]

  const handleRangeSelect = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    let selected = event.currentTarget.dataset['range']
    if (!selected) setRange(undefined)
    else setRange(parseInt(selected))
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
                className='border px-3 py-2 rounded-xl font-light'
              >
                {range} นาที
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )

}

export default DateInfo