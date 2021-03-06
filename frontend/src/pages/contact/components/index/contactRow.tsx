import Link from 'next/link'
import { Account } from 'types'
import { mapRoleTitle } from 'lib/helpers'

type Props = {
  contact: Account
}

const ContactRow: React.FC<Props> = ({ contact }) => {
  return (
    <div className='grid grid-cols-3 border-b py-3 items-center'>
      <div>
        {contact.firstName} {contact.lastName}
      </div>
      <div>{mapRoleTitle(contact.role)}</div>
      <div className='flex justify-end'>
        <Link href={`/contact/${contact._id}`} passHref>
          <button className='border border-[color:var(--light-blue)] text-[color:var(--light-blue)] hover:border-[color:var(--blue)] hover:text-[color:var(--blue)] duration-100 pl-2 pr-3 rounded-full text-sm flex items-center'>
            <span className='material-icons mr-1 text-lg'>watch_later</span>
            <span>นัดหมาย</span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ContactRow
