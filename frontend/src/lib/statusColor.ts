export const colorizeStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return 'border-l-amber-500'
    case 'ongoing':
      return 'border-l-emerald-500'
    case 'done':
      return 'border-l-gray-700'
    case 'abandoned':
      return 'border-l-rose-500'
    default:
      return 'border-l-gray-700'
  }
}
