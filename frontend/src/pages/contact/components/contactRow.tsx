import Link from "next/link"

type Props = {}

const ContactRow: React.FC<Props> = () => {
  return (
    <tr className='border-b'>
      <td>ไนน์แบคโฮ ฮอตอาข่า</td>
      <td>นักศึกษา</td>
      <td className='flex justify-end'>
        <Link href='/contact/123'>
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