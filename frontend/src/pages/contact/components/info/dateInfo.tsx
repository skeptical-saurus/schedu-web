import { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import TimeInput from './timeInput'
import { AccountSettingActiveTime, CreateOneAppointmentInput } from 'types'
import CommInput from './commInput'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

type Props = {
  date?: Date
  appoint: (apm: CreateOneAppointmentInput) => void
  activeTime: AccountSettingActiveTime
}

const commChoices = [
  { comm: 'F2F', title: 'Face-to-Face' },
  { comm: 'TEL', title: 'โทรศัพท์' },
  { comm: 'GM', title: 'Google Meet' },
  { comm: 'ZM', title: 'Zoom Meeting' },
  { comm: 'MT', title: 'Microsoft Teams' },
]

const hours = Array.from(Array(24).keys()).map((h) => h + 1)
const minutes = [0, 15, 30, 45]
const ranges = [15, 30, 45, 60, 90]

const DateInfo: React.FC<Props> = ({ date, appoint, activeTime }) => {
  let shownDate = date ? dayjs(date).format('DD MMMM YYYY') : '—'

  const [subject, setSubject] = useState('')
  const [note, setNote] = useState('')
  const [commMethod, setCommMethod] = useState('F2F')
  const [commUrl, setCommUrl] = useState('')

  const [hour, setHour] = useState<number>()
  const [minute, setMinute] = useState<number>()
  const [range, setRange] = useState<number>()

  const [startAt, setStartAt] = useState<Dayjs>()
  const [endAt, setEndAt] = useState<Dayjs>()

  const [valid, setValid] = useState(false)
  const [validTime, setValidTime] = useState(false)
  const [validActiveTime, setValidActiveTime] = useState(true)

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
    const isValid =
      date != undefined &&
      subject != '' &&
      hour != undefined &&
      minute != undefined &&
      range != undefined

    const isValidTime = hour != undefined && minute != undefined

    setValid(isValid)
    setValidTime(isValidTime)

    if (isValid && isValidTime) {
      const startAt = dayjs(date).set('hour', hour).set('minute', minute).set('second', 0)
      const endAt = startAt.add(range, 'minutes')
      setStartAt(startAt)
      setEndAt(endAt)

      const [startHour, startMinute] = activeTime.startAt.split(':').map(Number)
      const [endHour, endMinute] = activeTime.endAt.split(':').map(Number)
      const sameOrAfter = startAt.isSameOrAfter(
        startAt.set('hour', startHour).set('minute', startMinute),
        'minute'
      )
      const sameOrBefore = endAt.isSameOrBefore(
        endAt.set('hour', endHour).set('minute', endMinute),
        'minute'
      )
      setValidActiveTime(!startAt || !endAt || (sameOrAfter && sameOrBefore))
    } else {
      setStartAt(undefined)
      setEndAt(undefined)
    }
  }, [date, subject, note, hour, minute, range, activeTime])

  const submit = () => {
    if (hour == undefined || minute == undefined || range == undefined || !startAt || !endAt) return
    appoint({
      subject,
      note,
      startAt: startAt.format(),
      endAt: endAt.format(),
      commMethod,
      commUrl,
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
          <input
            onChange={(event) => setSubject(event.target.value)}
            type='text'
            placeholder='ประชุมโปรเจคด่วน จะส่งแล้ว'
            value={subject}
            className='w-full border rounded-xl p-3'
          />
        </div>
      </div>
      <div className='grid grid-cols-12 gap-8 my-8'>
        <div className='col-span-6 md:col-span-4 lg:col-span-6 xl:col-span-4'>
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
        <div className='col-span-6'>
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
        <div className='col-span-5 md:col-span-2'>
          <div className='text-sm mb-2 text-gray-500 flex items-center'>
            <span className='material-icons text-lg'>email</span>
            <span className='ml-1'>ช่องทางสื่อสาร</span>
          </div>
          <CommInput
            methods={commChoices}
            method={commChoices.find((comm) => comm.comm === commMethod)}
            setMethod={handleMethodChange}
          />
        </div>
        <div className='col-span-5 md:col-span-3'>
          <div className='text-sm mb-2 text-gray-500 flex items-center'>
            <span className='material-icons text-lg'>link</span>
            <span className='ml-1'>ลิงก์แนบ (ถ้ามี)</span>
          </div>
          <input
            onChange={(event) => setCommUrl(event.target.value)}
            type='text'
            placeholder='https://iamkanz.com/meet/example'
            value={commUrl}
            className='w-full border rounded-xl p-3'
          />
        </div>
      </div>
      <div className='my-8'>
        <div>
          <div className='text-sm mb-2 text-gray-500 flex items-center'>
            <span className='material-icons text-lg'>description</span>
            <span className='ml-1'>รายละเอียดแนบ</span>
          </div>
          <textarea
            onChange={(event) => setNote(event.target.value)}
            rows={6}
            placeholder='ขอให้เตรียมตัวกันมาให้พร้อม ต้องพร้อมนะ พร้อม ๆ เลย'
            value={note}
            className='w-full border rounded-xl p-3 resize-none font-light'
          ></textarea>
        </div>
      </div>
      <div className='text-right'>
        {!validActiveTime && activeTime && (
          <span className='mr-5 text-red-800'>
            เวลาที่เลือกไม่อยู่ในช่วงเวลาที่นัดได้ ({activeTime?.startAt} - {activeTime?.endAt})
          </span>
        )}
        <button
          onClick={submit}
          className='px-20 py-3 rounded-full shadow bg-[color:var(--light-blue)] hover:bg-[color:var(--blue)] disabled:bg-gray-400 disabled:opacity-75 disabled:cursor-not-allowed text-white duration-100 font-light'
          disabled={!valid || !validActiveTime}
        >
          ส่งคำขอ
        </button>
      </div>
    </>
  )
}

export default DateInfo
