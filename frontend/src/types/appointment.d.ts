export interface AppointmentInformation {
  _id?: string
  subject: string
  status?: string
  sender?: string
  startAt: Date | string
  endAt: Date | string
  commMethod: string
  commUrl?: string
  note?: string
}
