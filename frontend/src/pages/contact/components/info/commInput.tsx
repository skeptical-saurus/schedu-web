import { Listbox } from '@headlessui/react'

type Props = {
  methods: { comm: string; title: string }[]
  method?: { comm: string; title: string }
  setMethod: Function
}

const CommInput: React.FC<Props> = ({ methods, method, setMethod }) => {
  const handleMethodChange = (method: { comm: string; title: string }) => {
    setMethod(method.comm)
  }

  return (
    <>
      <Listbox value={method} onChange={handleMethodChange}>
        <div className='relative mt-1'>
          <Listbox.Button className='border p-3 rounded-xl text-left flex items-center justify-between w-full'>
            <span>{method != undefined ? method.title : '—'}</span>
            <span className='material-icons text-gray-400'>expand_more</span>
          </Listbox.Button>
          <Listbox.Options className='absolute w-full max-h-48 overflow-y-scroll rounded-xl border mt-1 bg-white z-10'>
            {methods.map((method, index) => (
              <Listbox.Option
                key={index}
                value={method}
                className='p-3 border-b text-sm font-light cursor-pointer'
              >
                {method.title}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </>
  )
}

export default CommInput
