import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { Account, Appointment, Mutation, MutationApproveAppointmentArgs } from 'types'
import { useMutation, useQuery } from '@apollo/client'

import { formatTime, apmDuration } from 'lib/timeFormatter'
import { APPROVE_APPOINTMENT } from 'lib/mutations'
import { GET_PROFILE_DATA, GET_ACCOUNT_BY_ID } from 'lib/queries'
import { commMethodStatus } from 'lib/helpers'

type Props = {
  currentAccount?: Account
  appointment?: Appointment
  isOpen: boolean
  close: () => void
}

const ApproveModal: React.FC<Props> = ({ currentAccount, appointment: apm, isOpen, close }) => {
  const [approve] = useMutation<Mutation, MutationApproveAppointmentArgs>(APPROVE_APPOINTMENT, {
    refetchQueries: [GET_PROFILE_DATA],
  })

  const { loading, data } = useQuery(GET_ACCOUNT_BY_ID, {
    variables: { _id: apm?.sender as string },
  })
  const [sender, setSender] = useState<Account>()

  useEffect(() => {
    if (!loading) {
      setSender(data?.account)
    }
  }, [data, loading])

  const handleSubmit = () => {
    approve({ variables: { _id: apm?._id as string } })
    close()
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={close}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title className='text-2xl mb-6'>ยืนยันการเข้าร่วมนัดหมาย</Dialog.Title>
                  <div className='font-light my-6'>
                    <div className='text-lg font-medium mb-2'>{apm?.subject}</div>
                    <div className='text-sm mb-6'>
                      {apm?.note ? apm?.note : '[ไม่มีคำอธิบายเพิ่มเติม]'}
                    </div>
                    <div className='flex items-center gap-1 mb-1'>
                      <span>ผู้นัดหมาย:</span>
                      {currentAccount?._id !== apm?.sender ? (
                        <Link href={`/contact/${sender?._id}`} passHref>
                          <span className='text-[color:var(--light-blue)] hover:cursor-pointer hover:text-[color:var(--blue)] duration-100 pl-2 pr-3 flex items-center'>
                            {sender?.firstName} {sender?.lastName}
                          </span>
                        </Link>
                      ) : (
                        <>
                          {sender?.firstName} {sender?.lastName}
                        </>
                      )}
                    </div>
                    <div className='mb-1'>ช่องทางสื่อสาร: {commMethodStatus(apm?.commMethod!)}</div>
                    <div className='mb-6'>
                      ลิงก์แนบ:{' '}
                      {apm?.commUrl ? (
                        <a
                          href={apm?.commUrl}
                          target='_blank'
                          rel='noreferrer'
                          className='text-[color:var(--light-blue)] hover:cursor-pointer hover:text-[color:var(--blue)] duration-100'
                        >
                          {apm?.commUrl}
                        </a>
                      ) : (
                        '-'
                      )}
                    </div>
                    <div className='mb-1'>{formatTime(apm)}</div>
                    <div className='text-sm'>{apmDuration(apm)}</div>
                  </div>
                  <div className='mt-4 text-right'>
                    <button
                      onClick={handleSubmit}
                      className='px-8 py-2 rounded-full bg-emerald-200  text-emerald-800 hover:bg-emerald-300 shadow-md duration-150'
                    >
                      เข้าร่วม
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ApproveModal
