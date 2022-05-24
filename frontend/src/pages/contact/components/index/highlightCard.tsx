import Link from 'next/link'
import { ContactInformation } from 'types/contact'
import { mapRoleTitle } from 'lib/contact'

type Props = {
  contact: ContactInformation
}

const HighlightCard: React.FC<Props> = ({ contact }) => {
  return (
    <Link href={`/contact/${contact._id}`} passHref>
      <div className='px-6 py-8 rounded-xl shadow-xl text-center bg-gray-50'>
        <div>
          <span className='material-icons text-7xl text-gray-600 mb-4'>assignment_ind</span>
        </div>
        <div className='mb-1'>
          {contact.firstName} {contact.lastName}
        </div>
        <div className='font-light text-sm text-gray-700'>{mapRoleTitle(contact.businessId)}</div>
      </div>
    </Link>
  )
}

export default HighlightCard
