import HighlightCard from './components/highlightCard'
import ContactRow from './components/contactRow'
import { Key, useEffect, useState } from 'react'
import { ContactInformation } from 'interface/contact'

type Props = {}

const Contact: React.FC<Props> = () => {

  const [contacts, setContacts] = useState<ContactInformation[]>([])
  const [filteredContacts, setFilteredContacts] = useState<ContactInformation[]>([])

  useEffect(() => {
    const getContacts = async () => {
      // TODO: replace with contact request function
      const result = [
        {id: 'ASDASDASDSAD', firstname: 'ไนน์แบคโฮ', lastname: 'ฮอตอาข่า', role: 'std'},
        {id: 'QWEQWEQWEQWE', firstname: 'ไอซ์เวิลด์', lastname: 'แอสเตอร์', role: 'std'},
        {id: 'AXCZXCASDFQW', firstname: 'ไนน์แซีนฮัลโหล', lastname: 'แรงผลักโหลยบคโฮ', role: 'prof'},
        {id: 'GWETWQWEQQWW', firstname: 'ไอซ์เวิลด์', lastname: 'แรงผลักโหลยบคโฮ', role: 'ofc'},
        {id: 'JOAUSDOIASDS', firstname: 'ไนน์แบคโฮ', lastname: 'แอสเตอร์', role: 'std'}
      ]
      setContacts(result)
      setFilteredContacts(result)
    }
    getContacts()
  }, [])

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let searchValue: string = event.target.value
    let filtered = contacts.filter(contact => `${contact.firstname} ${contact.lastname}`.includes(searchValue))
    setFilteredContacts(filtered)
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
      <div>
        <div className='grid grid-cols-3 border-b font-bold py-3'>
          <div>
            ชื่อ-สกุล
          </div>
          <div>
            ตำแหน่ง
          </div>
        </div>
        { filteredContacts.map(contact =>
          <ContactRow
            key={contact.id}
            contact={contact}
          />
        )}
      </div>
    </>
  )
}

export default Contact