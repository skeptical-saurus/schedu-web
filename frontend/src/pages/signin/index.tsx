import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

type Props = {}

const SignIn: React.FC<Props> = () => {

    const {signIn} = useAuth()

    useEffect(() => {
      
    }, [])

    return (
      <div className='min-h-screen bg-[color:var(--blue)] text-white'>
        <div className='container min-h-screen mx-auto px-8 flex flex-col'>
          <div className='my-auto flex flex-col justify-center items-center'>
            <div className='text-8xl font-thin mb-8'>
              <span className='text-[color:var(--lighter-blue)]'>Sch</span>edu
            </div>
            <button
              onClick={() => signIn()}
              className='rounded-full px-8 py-2 text-sm font-light border hover:border-blue-200 hover:text-blue-200 duration-100'
            >
              sign-in with ITKMITL account
            </button>
          </div>
          <div className='py-8 text-center text-sm font-light opacity-75'>
            <div>made by skeptical saurus team</div>
          </div>
        </div>
      </div>
    )

}

export default SignIn