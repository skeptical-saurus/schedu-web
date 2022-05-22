import HighlightCard from './components/index/highlightCard'
import ContactRow from './components/index/contactRow'
import { useEffect, useState } from 'react'
import { ContactInformation } from 'interface/contact'

import { GET_ACCOUNTS } from 'lib/queries'
import { useQuery } from '@apollo/client'

type Props = {}

const Contact: React.FC<Props> = () => {
  const [contacts, setContacts] = useState<ContactInformation[]>([])
  const [filteredContacts, setFilteredContacts] = useState<ContactInformation[]>([])

  const { loading, error, data } = useQuery(GET_ACCOUNTS)

  useEffect(() => {
    const getContacts = async () => {
      // TODO: replace with contact request function
      // query all users
      if (!loading) {
        setContacts(data.accounts)
        setFilteredContacts(data.accounts)
      }
    }
    getContacts()
  }, [data, loading])

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let searchValue: string = event.target.value
    let filtered = contacts.filter((contact) =>
      `${contact.firstName} ${contact.lastName}`.includes(searchValue)
    )
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
          <input
            onChange={searchHandler}
            type='text'
            placeholder='ค้นหาผู้ติดต่อ'
            className='w-96 focus:outline-none'
          />
        </div>
      </div>
      <div>
        <div className='grid grid-cols-3 border-b font-bold py-3'>
          <div>ชื่อ-สกุล</div>
          <div>ตำแหน่ง</div>
        </div>
        {filteredContacts.map((contact) => (
          <ContactRow key={contact._id} contact={contact} />
        ))}
      </div>
    </>
  )
}

export default Contact
