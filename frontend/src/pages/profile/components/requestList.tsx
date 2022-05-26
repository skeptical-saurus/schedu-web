import { Appointment } from 'types'
import { formatTime, apmDuration } from 'lib/timeFormatter'

type Props = {
  appointments?: Appointment[]
  moreDetail: Function
  submit: Function
}

const RequestList: React.FC<Props> = ({ appointments, moreDetail, submit }) => {
  const renderList = () => {
    return appointments?.map((apm) => (
      <div key={`request-${apm._id}`} className='grid grid-cols-6 py-3 border-b'>
        <div className='col-span-6 md:col-span-4'>
          <div className='truncate w-full mb-1'>{apm.subject}</div>
          <div className='flex items-center flex-wrap font-light text-sm text-gray-600'>
            <div className='mr-2'>{formatTime(apm)}</div>
            <div>{apmDuration(apm)}</div>
          </div>
        </div>
        <div className='col-span-6 md:col-span-2 flex items-center justify-end ml-8 mt-4 md:mt-0'>
          <button
            onClick={() => moreDetail(apm)}
            className='px-3 py-1 border border-[color:var(--light-blue)] text-[color:var(--light-blue)] hover:border-[color:var(--blue)] hover:text-[color:var(--blue)] duration-100 rounded-full text-xs font-light'
          >
            รายละเอียด
          </button>
          <button
            onClick={() => submit(apm, 'APPROVE')}
            className='group w-8 h-8 flex border border-emerald-500 bg-emerald-500 hover:border-emerald-600 hover:bg-emerald-600 ml-3 duration-100 rounded-full'
          >
            <span className='material-icons m-auto text-sm text-white group-hover:border-emerald-600 duration-100'>
              done
            </span>
          </button>
          <button
            onClick={() => submit(apm, 'DENY')}
            className='group w-8 h-8 flex border border-rose-700 hover:border-rose-900 rounded-full ml-3 duration-100'
          >
            <span className='material-icons m-auto text-sm text-rose-700 group-hover:border-rose-900 duration-100'>
              close
            </span>
          </button>
        </div>
      </div>
    ))
  }

  const renderEmpty = () => {
    return (
      <div className='flex items-center text-gray-400'>
        <span className='material-icons mr-2'>drafts</span>
        <span>ไม่มีคำร้องขอใหม่</span>
      </div>
    )
  }

  return (
    <>
      <div className='border rounded-xl p-8 mb-8'>
        <div className='text-xl font-bold mb-4'>รายการร้องขอ</div>
        <div className='max-h-96 overflow-y-scroll'>{appointments?.length ? renderList() : renderEmpty()}</div>
      </div>
    </>
  )
}

export default RequestList
