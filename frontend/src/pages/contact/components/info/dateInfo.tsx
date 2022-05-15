import dayjs from 'dayjs'

type Props = {
  date?: Date
}

const DateInfo: React.FC<Props> = ({ date }) => {

  let shownDate = date ? dayjs(date).format('DD MMMM YYYY') : '—'

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
        <div className='col-span-2'>
          <div className='text-sm mb-2 text-gray-500 flex items-center'>
            <span className='material-icons text-lg'>schedule</span>
            <span className='ml-1'>ช่วงเวลา</span>
          </div>
          <div className='grid grid-cols-4'>
            
          </div>
        </div>
      </div>

    </>
  )

}

export default DateInfo