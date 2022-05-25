import { Appointment } from 'types'
import dayjs from 'dayjs'

export const formatTime = (apm: Appointment | undefined) => {
  if (!apm) return ''
  return `${dayjs(apm.startAt).format('DD MMM YYYY [at] hh:mmA')} - ${dayjs(apm.endAt).format(
    'hh:mmA'
  )}`
}

export const apmDuration = (apm: Appointment | undefined) => {
  if (!apm) return ''
  return `(ระยะเวลา: ${dayjs(apm.endAt).diff(dayjs(apm.startAt), 'minutes')} นาที)`
}
