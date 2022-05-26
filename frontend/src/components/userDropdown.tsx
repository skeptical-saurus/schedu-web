import { Menu } from '@headlessui/react'
import { useAuth } from 'context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Account } from 'types'

type Props = {
  user?: Account
}

const menus = [
  { title: 'Contact', icon: 'format_list_bulleted', link: '/contact', smDisplay: true },
  { title: 'Profile', icon: 'badge', link: '/profile', smDisplay: true },
  { title: 'Edit Profile', icon: 'edit_note', link: '/profile/edit' }
]

const UserDropdown: React.FC<Props> = ({ user }) => {

  const router = useRouter()
  const { signOut } = useAuth()

  const [mount, setMount] = useState(false)

  router.events.on('routeChangeStart', () => {
    setMount(false)
  })

  const signOutHandler = async () => {
    const result: Boolean = await signOut()
    if (result) router.push('/signin')
  }

  const haveimage = () => {
    if (user?.image) {
      return (
        <img
          className='w-16 text-gray-600 rounded-full'
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
        />
      )
    }
    return (
      <span className='w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full'>
        <span className='material-icons'>account_circle</span>
      </span>
    )
  }

  return (
    <>
      <Menu>
        <div className='relative'>
          <Menu.Button
            onClick={() => {
              setMount(!mount)
            }}
            className='text-[color:var(--light-blue)] font-bold flex items-center'
          >
            <span className='material-icons mr-1'>person</span>
            <span className='hidden md:inline'>
              {user?.firstName} {user?.lastName}
            </span>
            <span className='inline md:hidden'>
              Account
            </span>
          </Menu.Button>
          {mount && (
            <Menu.Items
              static
              className='absolute -right-8 mt-8 w-80 bg-white text-gray-800 shadow-xl rounded-xl'
            >
              <div className='flex items-center p-4'>
                {haveimage()}
                <div className='my-auto ml-3'>
                  <Link href='/profile'>
                    <a className='text-[color:var(--light-blue)] hover:underline underline-offset-1 duration-100'>
                      {user?.firstName} {user?.lastName}
                    </a>
                  </Link>
                  <div className='text-sm font-light text-gray-500'>นักศึกษา</div>
                </div>
              </div>
              {menus.map((menu, index) => (
                <Link href={menu.link} key={index}>
                  <a className={`${menu.smDisplay ? 'flex md:hidden' : 'flex'} px-4 py-3 items-center border-t cursor-pointer duration-100 text-grey-800 hover:text-[color:var(--light-blue)]`}>
                    <span className='material-icons text-xl mr-2'>{menu.icon}</span>
                    <span>{menu.title}</span>
                  </a>
                </Link>
              ))}
              <button
                onClick={signOutHandler}
                className='w-full px-4 py-3 flex items-center border-t cursor-pointer duration-100 text-rose-500 hover:text-rose-700'
              >
                <span className='material-icons text-xl mr-2'>logout</span>
                <span>ออกจากระบบ</span>
              </button>
            </Menu.Items>
          )}
        </div>
      </Menu>
    </>
  )
}

export default UserDropdown
