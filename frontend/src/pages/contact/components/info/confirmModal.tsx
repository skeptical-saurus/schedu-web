import { Dialog, Transition } from '@headlessui/react'
import dayjs from 'dayjs'
import { Fragment } from 'react'
import { CreateOneAppointmentInput, Mutation, MutationCreateAppointmentArgs } from 'types'
import { useMutation } from '@apollo/client'
import { CREATE_APPOINTMENT } from 'lib/mutations'
import { GET_PROFILE_DATA } from 'lib/queries'
import { useRouter } from 'next/router'

type Props = {
  appointment: CreateOneAppointmentInput
  isOpen: boolean
  close: () => void
}

const ConfirmModal: React.FC<Props> = ({ appointment: apm, isOpen, close }) => {
  const router = useRouter()
  const [createAppointment] = useMutation<Mutation, MutationCreateAppointmentArgs>(
    CREATE_APPOINTMENT,
    {
      refetchQueries: [GET_PROFILE_DATA],
      onCompleted: (data) => {
        router.push(`/profile/${data.createAppointment?.record?._id ?? ''}`)
      },
    }
  )

  const handleSubmit = () => {
    createAppointment({
      variables: {
        record: apm,
      },
    })
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
                  <Dialog.Title className='text-2xl mb-6'>ยืนยันรายละเอียดนัดหมาย</Dialog.Title>
                  <div className='font-light my-6'>
                    <div className='text-lg font-medium mb-2'>{apm?.subject}</div>
                    <div className='text-sm mb-6'>
                      {apm?.note ? apm?.note : '[ไม่มีคำอธิบายเพิ่มเติม]'}
                    </div>
                    <div className='mb-1'>
                      {dayjs(apm?.startAt).format('DD MMM YYYY')} เวลา{' '}
                      {dayjs(apm?.startAt).format('HH:mmA')} - {dayjs(apm?.endAt).format('HH:mmA')}
                    </div>
                    <div className='text-sm'>(ระยะเวลา: 30 นาที)</div>
                  </div>
                  <div className='mt-4 text-right'>
                    <button
                      onClick={handleSubmit}
                      className='px-8 py-2 rounded-full bg-emerald-200  text-emerald-800 hover:bg-emerald-300 shadow-md duration-150'
                    >
                      ส่งคำขอนัดหมาย
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

export default ConfirmModal
