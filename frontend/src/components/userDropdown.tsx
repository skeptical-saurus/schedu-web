import { Menu } from '@headlessui/react'

const UserDropdown: React.FC = () => {

  const menus = [
    { title: 'แก้ไขโปรไฟล์', icon: 'edit_note', link: '/user/edit' },
  ]

  const signOut = () => {
    // TODO: Sign out function
  }

  return (
    <>
      <Menu>
        <div className='relative'>
          <Menu.Button className='text-[color:var(--light-blue)] font-bold flex items-center'>
            <span className='material-icons mr-1'>person</span>
            <span>Foo Bar</span>
          </Menu.Button>
          <Menu.Items className='absolute -right-8 mt-8 w-80 bg-white text-gray-800 shadow-xl rounded-xl'>
            <div className='flex items-center p-4'>
              <span className='w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full'>
                <span className='material-icons'>collections</span>
              </span>
              <div className='my-auto ml-3'>
                <div className='text-[color:var(--light-blue)]'>Dora Hudson</div>
                <div className='text-sm font-light text-gray-500'>นักศึกษา</div>
              </div>
            </div>
            {menus.map((menu, index) => (
              <a href={menu.link} key={index} className='px-4 py-3 flex items-center border-t cursor-pointer duration-100 text-grey-800 hover:text-[color:var(--light-blue)]'>
                <span className='material-icons text-xl mr-2'>{menu.icon}</span>
                <span>{menu.title}</span>
              </a>
            ))}
            <button onClick={signOut} className='w-full px-4 py-3 flex items-center border-t cursor-pointer duration-100 text-rose-500 hover:text-rose-700'>
              <span className='material-icons text-xl mr-2'>logout</span>
              <span>ออกจากระบบ</span>
            </button>
          </Menu.Items>
        </div>
      </Menu>
    </>
  )
}

export default UserDropdown