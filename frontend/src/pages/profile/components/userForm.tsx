import { ContactInformation } from 'types/contact'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  user?: ContactInformation
}

const UserForm: React.FC<Props> = ({ user }) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')

  useEffect(() => {
    if (!user) return
    setFirstname(user.firstname ? user.firstname : '')
    setLastname(user.lastname ? user.lastname : '')
    setEmail(user.email ? user.email : '')
    setTel(user.tel ? user.tel : '')
  })

  const submit = () => {
    // TODO: send update of the user information
  }

  return (
    <>
      <div className='flex justify-center my-8'>
        <div className='relative p-8 border shadow-2xl w-2/5 rounded-2xl'>
          <div className='flex items-center'>
            <span className='w-28 h-28 flex items-center justify-center bg-gray-200 rounded-full'>
              <span className='material-icons text-4xl'>collections</span>
            </span>
            <div className='ml-6 text-2xl font-bold'>แก้ไขข้อมูลโปรไฟล์</div>
          </div>
          <div className='grid grid-cols-2 gap-x-8 gap-y-6 py-8'>
            <div>
              <label htmlFor='firstname' className='text-sm'>
                ชื่อจริง
              </label>
              <input
                onChange={(event) => {
                  setFirstname(event.target.value)
                }}
                id='firstname'
                type='text'
                placeholder='สุปกิต'
                value={firstname}
                className='border-b font-light w-full mt-1'
              />
            </div>
            <div>
              <label htmlFor='lastname' className='text-sm'>
                นามสกุล
              </label>
              <input
                onChange={(event) => {
                  setLastname(event.target.value)
                }}
                id='lastname'
                type='text'
                placeholder='ดอทซีซี'
                value={lastname}
                className='border-b font-light w-full mt-1'
              />
            </div>
            <div className='col-span-2'>
              <label htmlFor='email' className='text-sm'>
                E-mail
              </label>
              <input
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
                id='email'
                type='text'
                placeholder='supkit@cc.com'
                value={email}
                className='border-b font-light w-full mt-1'
              />
            </div>
            <div className='col-span-2'>
              <label htmlFor='tel' className='text-sm'>
                เบอร์ติดต่อ
              </label>
              <input
                onChange={(event) => {
                  setTel(event.target.value)
                }}
                id='tel'
                type='text'
                placeholder='012 234 4567'
                value={tel}
                className='border-b font-light w-full mt-1'
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-8'>
            <Link href='/profile'>
              <button className='w-full p-3 rounded-xl bg-gray-300 hover:bg-gray-400 duration-100'>
                ยกเลิก
              </button>
            </Link>
            <button
              onClick={submit}
              className='w-full p-3 rounded-xl bg-green-300 hover:bg-green-400 duration-100'
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserForm
