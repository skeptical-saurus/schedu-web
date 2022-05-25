import { Appointment } from 'types'
import { formatTime, apmDuration } from 'lib/timeFormatter'

type Props = {
  appointments?: Appointment[]
  moreDetail: Function
}

const OngoingList: React.FC<Props> = ({ appointments, moreDetail }) => {
  const renderList = () => {
    return appointments?.map((apm) => (
      <div key={`ongoing-${apm._id}`} className='grid grid-cols-5 py-3 border-b'>
        <div className='col-span-4'>
          <div className='truncate w-full mb-1'>{apm.subject}</div>
          <div className='font-light text-sm text-gray-600'>
            <div className='mb-1'>
              {formatTime(apm)} {apmDuration(apm)}
            </div>
            <div>สถานะ: {apm.status}</div>
          </div>
        </div>
        <div className='flex items-center justify-end ml-8'>
          <button
            onClick={() => moreDetail(apm)}
            className='px-3 py-1 border border-[color:var(--light-blue)] text-[color:var(--light-blue)] hover:border-[color:var(--blue)] hover:text-[color:var(--blue)] duration-100 rounded-full text-xs font-light'
          >
            รายละเอียด
          </button>
        </div>
      </div>
    ))
  }

  const renderEmpty = () => {
    return (
      <div className='flex items-center text-gray-400'>
        <span className='material-icons mr-2'>local_cafe</span>
        <span>ไม่มีรายการที่ดำเนินอยู่</span>
      </div>
    )
  }

  return (
    <>
      <div className='border rounded-xl p-8'>
        <div className='text-xl font-bold mb-4'>รายการที่ยังดำเนินอยู่</div>
        <div>{appointments ? renderList() : renderEmpty()}</div>
      </div>
    </>
  )
}

export default OngoingList
