import { ContactInformation } from 'interface/contact'
import { mapRoleTitle } from 'lib/contact'

type Props = {
  contact: ContactInformation
}

const PersonalInfo: React.FC<Props> = ({ contact }) => {

  return (
    <>
      <div className='flex items-center mb-8'>
        <span className='material-icons text-7xl text-gray-600'>account_circle</span>
        <div className='ml-3 font-light'>
          <div className='text-lg'>{contact.firstname} {contact.lastname}</div>
          <div className='text-sm text-gray-600'>{mapRoleTitle(contact.role)}</div>
        </div>
      </div>
      <div className='grid grid-cols-5'>
        <div className='col-span-2 py-3 border-b'>E-mail</div>
        <div className='col-span-3 py-3 border-b font-light'>{contact.email}</div>
        <div className='col-span-2 py-3 border-b'>เบอร์ติดต่อ</div>
        <div className='col-span-3 py-3 border-b font-light'>{contact.tel}</div>
      </div>
    </>
  )

}

export default PersonalInfo