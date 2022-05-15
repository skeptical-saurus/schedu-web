import { ContactInformation } from "interface/contact"

type Props = {
  contact: ContactInformation
}

const PersonalInfo: React.FC<Props> = ({ contact }) => {

  return (
    <>
      <div className='flex items-center'>
        <span className='material-icons text-6xl text-gray-600'>account_circle</span>
        <div className='ml-2'>
          <div>{contact.firstname} {contact.lastname}</div>
        </div>
      </div>
    </>
  )

}

export default PersonalInfo