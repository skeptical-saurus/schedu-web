import { getCookieValue } from 'lib/cookie'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'

type Props = {}

const SignIn: React.FC<Props> = () => {

  const [isSigned, updateSignState] = useState(false)

  const { signIn, signOut } = useAuth()

  useEffect(() => {
    const getToken = () => {
      const token = getCookieValue(document.cookie, "SCHEDU_FBIDTOKEN")
      if (token) updateSignState(true)
    }
    getToken()
  }, [])

  const renderActionPanel = () => {
    // Already sign-in
    if (isSigned) {
      return (
          <>
          <div className='mb-6'>
            กำลังอยู่ในระบบ ต้องการเข้าสู่หน้าหลักหรือไม่
          </div>
          <div className='flex items-center'>
            <a href="/">
              <button className='rounded-full px-8 py-2 text-sm font-light border hover:border-blue-200 hover:text-blue-200 duration-100'>
                เข้าสู่หน้าหลัก
              </button>
            </a>
            <button className='rounded-full px-8 py-2 text-sm font-light border bg-rose-700 border-rose-700 hover:bg-rose-800 hover:border-rose-800 duration-100 ml-4'>
              ออกจากระบบ
            </button>
          </div>
        </>
      )
    }

    // Anonymous user
    return (
      <button
        onClick={() => signIn()}
        className='rounded-full px-8 py-2 text-sm font-light border hover:border-blue-200 hover:text-blue-200 duration-100'
      >
        เข้าสู่ระบบด้วยบัญชี ITKMITL
      </button>
    )

  }

  return (
    <div className='min-h-screen bg-[color:var(--blue)] text-white'>
      <div className='container min-h-screen mx-auto px-8 flex flex-col'>
        <div className='my-auto flex flex-col justify-center items-center'>
          <div className='text-8xl font-thin mb-8'>
            <span className='text-[color:var(--lighter-blue)]'>Sch</span>edu
          </div>
          {renderActionPanel()}
        </div>
        <div className='py-8 text-center text-sm font-light opacity-75'>
          <div>made by skeptical saurus team</div>
        </div>
      </div>
    </div>
  )

}

export default SignIn