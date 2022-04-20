import HighlightCard from './components/highlightCard'
import ContactRow from './components/contactRow'

type Props = {}

const Contact: React.FC<Props> = () => {

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let searchValue: String = event.target.value
    // TODO: Filter the contact list
  }

  return (
    <>
      <div className='font-bold mb-6 flex items-center'>
        <span className='material-icons text-4xl mr-3'>recent_actors</span>
        <span className='text-3xl'>ติดต่อล่าสุด</span>
      </div>
      <div className='grid grid-cols-4 gap-4 mb-12'>
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </div>
      <div className='flex justify-between items-center mb-6'>
        <div className='font-bold flex items-center'>
          <span className='material-icons text-4xl mr-3'>connect_without_contact</span>
          <span className='text-3xl'>รายชื่อผู้ติดต่อ</span>
        </div>
        <div className='border rounded-full px-4 py-3 flex'>
          <span className='material-icons mr-2'>search</span>
          <input onChange={searchHandler} type='text' placeholder='ค้นหาผู้ติดต่อ' className='w-96 focus:outline-none' />
        </div>
      </div>
      <table className='table-auto w-full text-left'>
        <thead>
          <tr className='border-b text-lg'>
            <th>ชื่อ-สกุล</th>
            <th>ตำแหน่ง</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <ContactRow />
          <ContactRow />
          <ContactRow />
          <ContactRow />
        </tbody>
      </table>
    </>
  )
}

export default Contact