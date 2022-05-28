export const colorizeStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return 'border-l-4 border-l-amber-500'
    case 'ongoing':
      return 'border-l-4 border-l-emerald-500'
    case 'done':
      return 'border-l-4 border-l-gray-700'
    case 'abandoned':
      return 'border-l-4 border-l-rose-500'
    default:
      return 'border-l-4 border-l-gray-700'
  }
}
