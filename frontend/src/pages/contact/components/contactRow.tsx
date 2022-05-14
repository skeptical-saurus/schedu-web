import Link from 'next/link'
import { ContactInformation } from 'interface/contact'

type Props = {
  contact: ContactInformation,
}

const ContactRow: React.FC<Props> = ({ contact }) => {

  const fullname = `${contact.firstname} ${contact.lastname}`

  return (
    <tr className='border-b'>
      <td>{fullname}</td>
      <td>{contact.role}</td>
      <td className='flex justify-end'>
        <Link href={`/contact/${contact.id}`} passHref>
          <button className='border border-[color:var(--light-blue)] text-[color:var(--light-blue)] hover:border-[color:var(--blue)] hover:text-[color:var(--blue)] duration-100 pl-2 pr-3 rounded-full text-sm flex items-center'>
            <span className='material-icons mr-1 text-lg'>watch_later</span>
            <span>นัดหมาย</span>
          </button>
        </Link>
      </td>
    </tr>
  )
}

export default ContactRow