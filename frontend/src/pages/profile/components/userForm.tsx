import Link from 'next/link'

const UserForm: React.FC = () => {

  const submit = () => {
    
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
              <label htmlFor='firstname' className='text-sm'>ชื่อจริง</label>
              <input id='firstname' type='text' placeholder='สุปกิต' className='border-b font-light w-full mt-1' />
            </div>
            <div>
              <label htmlFor='firstname' className='text-sm'>นามสกุล</label>
              <input id='firstname' type='text' placeholder='ดอทซีซี' className='border-b font-light w-full mt-1' />
            </div>
            <div className='col-span-2'>
              <label htmlFor='firstname' className='text-sm'>E-mail</label>
              <input id='firstname' type='text' placeholder='supkit@cc.com' className='border-b font-light w-full mt-1' />
            </div>
            <div className='col-span-2'>
              <label htmlFor='firstname' className='text-sm'>เบอร์ติดต่อ</label>
              <input id='firstname' type='text' placeholder='012 234 4567' className='border-b font-light w-full mt-1' />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-8'>
            <Link href='/profile'>
              <button className='w-full p-3 rounded-xl bg-gray-300 hover:bg-gray-400 duration-100'>
                ยกเลิก
              </button>
            </Link>
            <button onClick={submit} className='w-full p-3 rounded-xl bg-green-300 hover:bg-green-400 duration-100'>
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserForm