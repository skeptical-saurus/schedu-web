import UserDropdown from './userDropdown'
import Link from 'next/link'
import { useState } from 'react'
import { Query } from 'types'

import { GET_CURRENT_ACCOUNT } from 'lib/queries'
import { useQuery } from '@apollo/client'

const TRIGGER_DIFF = 64
let lastPos = 0

const navigators = [
  { path: '/profile', title: 'โปรไฟล์' },
  { path: '/contact', title: 'รายชื่อติดต่อ' },
]

const Navbar: React.FC = () => {
  const [shown, setShown] = useState(true)

  const { loading, data } = useQuery<Query>(GET_CURRENT_ACCOUNT)

  const renderNavigators = () => {
    return (
      <>
        <div className='flex items-center'>
          {navigators.map((nav, index) => {
            return (
              <Link key={index} href={nav.path}>
                <a className='hidden md:inline mr-6 font-light hover:text-[color:var(--light-blue)] duration-100'>
                  {nav.title}
                </a>
              </Link>
            )
          })}
        </div>
      </>
    )
  }

  // Listen for scrolling to show/hide navbar
  document.addEventListener('scroll', () => {
    let pos = window.scrollY
    setShown(pos <= lastPos)
    if (Math.abs(pos - lastPos) >= TRIGGER_DIFF) lastPos = pos
  })

  return (
    <div className={`fixed w-full z-50 duration-300 ${!shown ? '-translate-y-32' : ''}`}>
      <div className='container mx-auto p-8'>
        <div className='shadow-xl bg-gray-50 rounded-full px-8 py-4 flex items-center justify-between'>
          <div className='text-xl hover:animate-spin'>
            <span className='text-[color:var(--blue)]'>Sch</span>
            <span className='text-gray-800 font-light'>edu</span>
          </div>
          <div className='flex items-center'>
            {renderNavigators()}
            <div className='border-l border-gray-400 pl-4'>
              <UserDropdown user={data?.currentAccount} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
