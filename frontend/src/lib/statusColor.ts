export const colorizeStatus = (status: string) => {
  switch (status) {
    case 'pending':
      console.log('1')
      return 'border-amber-500'
    case 'ongoing':
      console.log('2')
      return 'border-emerald-500'
    case 'done':
      console.log('3')
      return 'border-gray-700'
    case 'abandoned':
      console.log('4')
      return 'border-rose-500'
    default:
      console.log('5')
      return 'border-gray-700'
  }
}
