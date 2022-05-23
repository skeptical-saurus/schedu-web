import { AppointmentInformation } from "types/appointment"

type Props = {
  appointments?: AppointmentInformation[],
  needMoreDetail: Function,
  submit: Function,
}

const RequestList: React.FC<Props> = ({ appointments, needMoreDetail, submit }) => {
  return (
    <>
      <div className='border rounded-xl p-8 mb-8'>
        <div className='text-xl font-bold mb-4'>รายการร้องขอ</div>
        <div>
          {appointments?.map(apm => (            
            <div key={apm._id} className='grid grid-cols-6 py-3 border-b'>
              <div className='col-span-4'>
                <div className='truncate w-full mb-1'>
                  {apm.subject}
                </div>
                <div className="font-light text-sm text-gray-600">
                  <div>
                    10 Aug 2022 at 10:30AM - 11:00AM (ระยะเวลา: 30 นาที)
                  </div>
                </div>
              </div>
              <div className='col-span-2 flex items-center justify-end ml-8'>
                <button onClick={() => needMoreDetail(apm)} className='px-3 py-1 border border-[color:var(--light-blue)] text-[color:var(--light-blue)] hover:border-[color:var(--blue)] hover:text-[color:var(--blue)] duration-100 rounded-full text-xs font-light'>
                  รายละเอียด
                </button>
                <button onClick={() => submit(apm, 'APPROVE')} className='group w-8 h-8 flex border border-emerald-500 bg-emerald-500 hover:border-emerald-600 hover:bg-emerald-600 ml-3 duration-100 rounded-full'>
                  <span className='material-icons m-auto text-sm text-white group-hover:border-emerald-600 duration-100'>done</span>
                </button>
                <button onClick={() => submit(apm, 'DENY')} className='group w-8 h-8 flex border border-rose-700 hover:border-rose-900 rounded-full ml-3 duration-100'>
                  <span className='material-icons m-auto text-sm text-rose-700 group-hover:border-rose-900 duration-100'>close</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default RequestList
