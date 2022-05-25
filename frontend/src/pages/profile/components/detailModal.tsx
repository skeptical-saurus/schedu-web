import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Appointment } from 'types'
import { formatTime, apmDuration } from 'lib/timeFormatter'

type Props = {
  appointment?: Appointment
  isOpen: boolean
  close: () => void
}

const DetailModal: React.FC<Props> = ({ appointment: apm, isOpen, close }) => {
  const handleSubmit = () => {
    // TODO: do submit approval
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
                  <Dialog.Title className='flex items-start justify-between text-2xl mb-6'>
                    <span>{apm?.subject}</span>
                    <button
                      onClick={close}
                      className='material-icons text-gray-500 hover:text-gray-700 duration-150 text-2xl cursor-pointer'
                    >
                      close
                    </button>
                  </Dialog.Title>
                  <div className='font-light'>
                    <div className='mb-6'>{apm?.note ? apm?.note : '[ไม่มีคำอธิบายเพิ่มเติม]'}</div>
                    <div className='mb-6'>ช่องทางสื่อสาร: {apm?.commMethod}</div>
                    <div className='mb-6'>ลิงก์แนบ: {apm?.commUrl ? apm?.commUrl : '-'}</div>
                    <div className='mb-1'>ช่วงเวลา: {formatTime(apm)}</div>
                    <div className='text-sm'>{apmDuration(apm)}</div>
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

export default DetailModal
