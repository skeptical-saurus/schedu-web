import ContactCard from './components/contactCard'

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
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
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
    </>
  )
}

export default Contact