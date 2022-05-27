import { Account } from 'types'

type Props = {
  contact?: Account
}

const PersonalInfo: React.FC<Props> = ({ contact }) => {
  const haveimage = () => {
    if (contact?.image) {
      return (
        <img
          className='w-24 text-gray-600 rounded-full hover:animate-spin'
          src={contact.image}
          alt={`${contact.firstName} ${contact.lastName}`}
        />
      )
    }
    return <span className='material-icons text-8xl text-gray-600'>account_circle</span>
  }

  return (
    <>
      <div className='flex items-center mb-8'>
        {haveimage()}
        <div className='ml-3 font-light'>
          <div className='text-lg'>
            {contact?.firstName} {contact?.lastName}
          </div>
          {/* Comment until contact have role */}
          {/* <div className='text-sm text-gray-600'>{mapRoleTitle(contact?.role)}</div> */}
        </div>
      </div>
      <div className='grid grid-cols-5'>
        <div className='col-span-2 py-3 border-b'>E-mail</div>
        <div className='col-span-3 py-3 border-b font-light'>
          {contact?.contact?.email ? contact?.contact?.email : '-'}
        </div>
        <div className='col-span-2 py-3 border-b'>เบอร์ติดต่อ</div>
        <div className='col-span-3 py-3 border-b font-light'>
          {contact?.contact?.tel ? contact?.contact?.tel : '-'}
        </div>
      </div>
    </>
  )
}

export default PersonalInfo
