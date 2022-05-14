type Props = {}

const HighlightCard: React.FC<Props> = () => {
  return (
    <>
      <div className='px-6 py-8 rounded-xl shadow-xl text-center bg-gray-50'>
        <div>
          <span className="material-icons text-7xl text-gray-600 mb-4">assignment_ind</span>
        </div>
        <div className='mb-1'>ไนน์แบคโฮ ฮอตอาข่า</div>
        <div className='font-light text-sm text-gray-700'>นักศึกษา</div>
      </div>
    </>
  )
}

export default HighlightCard