import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import TimeInput from './timeInput'
import { AppointmentInformation } from 'types/appointment'
import CommInput from './commInput'

type Props = {
  date?: Date,
  appoint: (apm: AppointmentInformation) => void
}

const commChoices = [
  {comm: 'F2F', title: 'Face-to-Face'},
  {comm: 'TEL', title: 'โทรศัพท์'},
  {comm: 'GM', title: 'Google Meet'},
  {comm: 'ZM', title: 'Zoom Meeting'},
  {comm: 'MT', title: 'Microsoft Teams'}
]

const hours = Array.from(Array(24).keys()).map((h) => h + 1)
const minutes = [0, 15, 30, 45]
const ranges = [15, 30, 45, 60, 90]

const DateInfo: React.FC<Props> = ({ date, appoint }) => {

  let shownDate = date ? dayjs(date).format('DD MMMM YYYY') : '—'

  const [subject, setSubject] = useState('')
  const [note, setNote] = useState('')
  const [commMethod, setCommMethod] = useState('F2F')
  const [commUrl, setCommUrl] = useState('')

  const [hour, setHour] = useState<number>()
  const [minute, setMinute] = useState<number>()
  const [range, setRange] = useState<number>()

  const [valid, setValid] = useState(false)
  const [validTime, setValidTime] = useState(false)

  const handleMethodChange = (method: string) => {
    setCommMethod(method)
  }

  const handleRangeSelect = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    let selected = event.currentTarget.dataset['range']
    if (!selected) setRange(undefined)
    else setRange(parseInt(selected))
  }

  const checkSelected = (comparator: number) => {
    return range === comparator
  }

  useEffect(() => {
    setValid(
      date != undefined &&
      subject != '' &&
      hour != undefined &&
      minute != undefined &&
      range != undefined
    )
    setValidTime(
      hour != undefined &&
      minute != undefined
    )
  }, [date, subject, note, hour, minute, range])

  const submit = () => {
    // TODO: Submit appointment request
    if (!hour || !minute || !range) return
    let startAt = dayjs(date).set('hour', hour).set('minute', minute).set('second', 0)
    let endAt = startAt.add(range, 'minutes')
    appoint({
      subject,
      note,
      startAt: startAt.format(),
      endAt: endAt.format(),
      commMethod,
      commUrl
    })
  }

  return (
    <>
      <div className='my-8'>
        <div>
          <div className='text-sm mb-2 text-gray-500 flex items-center'>
            <span className='material-icons text-lg'>event_available</span>
            <span className='ml-1'>วันที่เลือก</span>
          </div>
          <div className='text-2xl font-light'>{shownDate}</div>
        </div>
      </div>
      <div className='my-8'>
        <div>
          <div className='text-sm mb-2 text-gray-500 flex items-center'>
            <span className='material-icons text-lg'>drive_file_rename_outline</span>
            <span className='ml-1'>หัวข้อการนัดหมาย</span>
          </div>
          <input onChange={event => setSubject(event.target.value)} type='text' placeholder='ประชุมโปรเจคด่วน จะส่งแล้ว' value={subject} className='w-full border rounded-xl p-3' />
        </div>
      </div>
      <div className='grid grid-cols-3 gap-8 my-8'>
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
                disabled={!validTime}
              >
                {range} นาที
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='grid grid-cols-5 gap-8 my-8'>
        <div className='col-span-2'>
          <div className='text-sm mb-2 text-gray-500 flex items-center'>
            <span className='material-icons text-lg'>email</span>
            <span className='ml-1'>ช่องทางสื่อสาร</span>
          </div>
          <CommInput methods={commChoices} method={commChoices.find(comm => comm.comm === commMethod)} setMethod={handleMethodChange} />
        </div>
        <div className='col-span-3'>
          <div className='text-sm mb-2 text-gray-500 flex items-center'>
            <span className='material-icons text-lg'>link</span>
            <span className='ml-1'>ลิงก์แนบ (ถ้ามี)</span>
          </div>
          <input onChange={event => setCommUrl(event.target.value)} type='text' placeholder='https://iamkanz.com/meet/example' value={commUrl} className='w-full border rounded-xl p-3' />
        </div>
      </div>
      <div className='my-8'>
        <div>
          <div className='text-sm mb-2 text-gray-500 flex items-center'>
            <span className='material-icons text-lg'>description</span>
            <span className='ml-1'>รายละเอียดแนบ</span>
          </div>
          <textarea onChange={event => setNote(event.target.value)} rows={6} placeholder='ขอให้เตรียมตัวกันมาให้พร้อม ต้องพร้อมนะ พร้อม ๆ เลย' value={note} className='w-full border rounded-xl p-3 resize-none font-light'></textarea>
        </div>
      </div>
      <div className='text-right'>
        <button
          onClick={submit}
          className='px-20 py-3 rounded-full shadow bg-[color:var(--light-blue)] hover:bg-[color:var(--blue)] disabled:bg-gray-400 disabled:opacity-75 disabled:cursor-not-allowed text-white duration-100 font-light'
          disabled={!valid}
        >
          ส่งคำขอ
        </button>
      </div>
    </>
  )
}

export default DateInfo
