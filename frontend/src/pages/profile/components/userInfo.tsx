import Link from 'next/link'
import { Account } from 'types'

type Props = {
  user?: Account
}

const UserInfo: React.FC<Props> = ({ user }) => {
  const haveimage = () => {
    if (user?.image) {
      return (
        <img
          className='w-24 text-gray-600 rounded-full mx-auto'
          src={user?.image}
          alt={`${user?.firstName} ${user.lastName}`}
        />
      )
    }
    return (
      <span className='w-28 h-28 flex items-center justify-center bg-gray-200 rounded-full mx-auto'>
        <span className='material-icons text-8xl text-gray-600'>account_circle</span>
      </span>
    )
  }

  return (
    <>
      <div className='flex justify-center my-8'>
        <div className='relative text-center p-8 border shadow-2xl rounded-2xl'>
          <span className='absolute top-0 right-0 m-4'>
            <Link href='/profile/edit' passHref>
              <button className='group w-10 h-10 flex justify-center items-center rounded-xl border hover:border-[color:var(--blue)] duration-100'>
                <span className='material-icons text-gray-400 group-hover:text-[color:var(--blue)] duration-100'>
                  edit_note
                </span>
              </button>
            </Link>
          </span>
          {haveimage()}
          <div className='my-auto mt-5'>
            <div className='text-xl text-[color:var(--light-blue)]'>{`${user?.firstName} ${user?.lastName}`}</div>
            <div className='text-sm font-light text-gray-500'>นักศึกษา</div>
          </div>
          <div className='grid grid-cols-5 mt-8 text-left'>
            <div className='col-span-2 py-3 border-t'>E-mail</div>
            <div className='col-span-3 py-3 border-t font-light'>{user?.contact?.email}</div>
            <div className='col-span-2 py-3 border-t'>เบอร์ติดต่อ</div>
            <div className='col-span-3 py-3 border-t font-light'>
              {user?.contact?.tel ? user?.contact.tel : '-'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfo
