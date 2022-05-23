import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { AppointmentInformation } from 'types/appointment'

type Props = {
  appointment?: AppointmentInformation
  isOpen: boolean
  close: () => void
}

const DenyModal: React.FC<Props> = ({ appointment: apm, isOpen, close }) => {
  const handleSubmit = () => {
    // TODO: do submit deny
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
                <Dialog.Panel className='flex items-center justify-between w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title className='text-2xl'>ปฏิเสธการเข้าร่วม</Dialog.Title>
                  <div className='text-right'>
                    <button
                      onClick={handleSubmit}
                      className='px-8 py-2 rounded-full bg-rose-200  text-rose-800 hover:bg-rose-300 shadow-md duration-150'
                    >
                      ส่งคำปฏิเสธ
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

export default DenyModal
