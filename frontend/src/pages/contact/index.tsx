import ContactCard from './components/contactCard'

type Props = {}

const Contact: React.FC<Props> = () => {
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
      <div className='font-bold mb-6 flex items-center'>
        <span className='material-icons text-4xl mr-3'>connect_without_contact</span>
        <span className='text-3xl'>รายชื่อผู้ติดต่อ</span>
      </div>
    </>
  )
}

export default Contact