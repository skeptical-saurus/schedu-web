import { Account, Mutation, MutationUpdateAccountArgs, UpdateOneAccountInput } from 'types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { GET_CURRENT_ACCOUNT } from 'lib/queries'
import { UPDATE_USER_PROFILE } from 'lib/mutations'
import { useMutation } from '@apollo/client'

type Props = {
  user?: Account
}

const UserForm: React.FC<Props> = ({ user }) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [image, setImage] = useState('')
  const [formError, setFormError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  const [updateProfile] = useMutation<Mutation, MutationUpdateAccountArgs>(UPDATE_USER_PROFILE, {
    refetchQueries: [GET_CURRENT_ACCOUNT],
    onCompleted: (data) => {
      const user = data?.updateAccount?.record
      setFirstname(user?.firstName ?? firstname)
      setLastname(user?.lastName ?? lastname)
      setTel(user?.contact?.tel ?? tel)
    },
  })

  useEffect(() => {
    if (!user) return

    setFirstname(user.firstName ?? '')
    setLastname(user.lastName ?? '')
    setEmail(user.contact?.email ?? '')
    setTel(user.contact?.tel ?? '-')
    setImage(user.image ?? '')
  }, [user])

  const formValidator = () => {
    if (!firstname) {
      setFormError(true)
      setErrorMessage('โปรดระบุชื่อจริง')
    } else if (!lastname) {
      setErrorMessage('โปรดระบุนามสกุล')
      setFormError(true)
    } else if (!tel || !telValidate(tel)) {
      setFormError(true)
      setErrorMessage('ไม่ได้กรอกเบอร์ติดต่อหรือกรอกไม่ถูกต้อง')
    } else {
      setFormError(false)
      setErrorMessage('')
    }
  }

  const telValidate = (tel: string) => {
    return /^\d{10}$/.test(tel)
  }

  const submit = async () => {
    if (firstname && lastname && telValidate(tel)) {
      updateProfile({
        variables: {
          record: {
            firstName: firstname,
            lastName: lastname,
            contact: {
              email,
              tel,
            },
          },
        },
      }).then(() => {
        router.replace('/profile')
      })
    } else {
      formValidator()
    }
  }

  const haveimage = () => {
    if (image) {
      return (
        <img
          className='w-24 text-gray-600 rounded-full'
          src={image}
          alt={`${firstname} ${lastname}`}
        />
      )
    }
    return (
      <span className='w-28 h-28 flex items-center justify-center bg-gray-200 rounded-full'>
        <span className='material-icons text-8xl text-gray-600'>account_circle</span>
      </span>
    )
  }

  return (
    <>
      <div className='flex justify-center my-8'>
        <div className='relative p-8 border shadow-2xl rounded-2xl'>
          <div className='flex items-center'>
            {haveimage()}
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
                className='border-b font-light w-full mt-1 text-stone-400 cursor-not-allowed'
                disabled
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
                placeholder='012 345 6789'
                value={tel}
                className='border-b font-light w-full mt-1'
              />
            </div>
          </div>

          {formError && (
            <div className='p-2 mb-4 mt-4 bg-red-200 rounded-xl'>
              <span className='text-red-500'>{errorMessage}</span>
            </div>
          )}

          <div className='grid grid-cols-2 gap-x-8 gap-y-2'>
            <Link href='/profile' passHref={true}>
              <button className='col-span-2 md:col-span-1 w-full p-3 rounded-xl bg-gray-300 hover:bg-gray-400 duration-100'>
                ยกเลิก
              </button>
            </Link>
            <button
              onClick={submit}
              className='col-span-2 md:col-span-1 w-full p-3 rounded-xl bg-green-300 hover:bg-green-400 duration-100'
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
