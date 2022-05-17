import Link from 'next/link'
import UserDropdown from './userDropdown'

const Navbar: React.FC = () => {
  const navigators = [
    { path: '/', title: 'Home' },
    { path: '/contact', title: 'Contact' },
    { path: '/calendar', title: 'Calendar' },
    { path: '/notification', title: 'Notification' },
  ]

  const renderNavigators = () => {
    return (
      <>
        <div className='flex items-center'>
          {navigators.map((nav, index) => {
            return (
              <Link key={index} href={nav.path}>
                <a className='mr-6 font-light hover:text-[color:var(--light-blue)] duration-100'>
                  {nav.title}
                </a>
              </Link>
            )
          })}
        </div>
      </>
    )
  }

  return (
    <div className='fixed w-full'>
      <div className='container mx-auto p-8'>
        <div className='shadow-xl bg-gray-50 rounded-full px-8 py-4 flex items-center justify-between'>
          <div className='text-xl'>
            <span className='text-[color:var(--blue)]'>Sch</span>
            <span className='text-gray-800 font-light'>edu</span>
          </div>
          <div className='flex items-center'>
            {renderNavigators()}
            <div className='border-l border-gray-400 pl-4'>
              <UserDropdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
