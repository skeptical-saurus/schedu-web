import { Listbox } from '@headlessui/react'

type Props = {
  times: number[]
  time?: number
  setTime: Function
}

const TimeInput: React.FC<Props> = ({ times, time, setTime }) => {
  const handleTimeChange = (time: number) => {
    setTime(time)
  }

  const formatTime = (time: number) => {
    let timeStr = time.toString()
    return timeStr.length === 2 ? timeStr : `0${timeStr}`
  }

  return (
    <>
      <Listbox value={time} onChange={handleTimeChange}>
        <div className='relative mt-1'>
          <Listbox.Button className='border p-3 rounded-xl text-left w-20 flex items-center justify-between'>
            <span>{time != undefined ? formatTime(time) : '—'}</span>
            <span className='material-icons text-gray-400'>expand_more</span>
          </Listbox.Button>
          <Listbox.Options className='absolute w-20 max-h-48 overflow-y-scroll rounded-xl border mt-1 bg-white z-10'>
            {times.map((time, index) => (
              <Listbox.Option
                key={index}
                value={time}
                className='px-3 py-1.5 border-b text-sm font-light cursor-pointer'
              >
                {time}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </>
  )
}

export default TimeInput
