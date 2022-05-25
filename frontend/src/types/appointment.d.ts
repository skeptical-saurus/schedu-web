interface Participant {
  userId: string,
  main: boolean,
  confirmed: boolean,
  join: boolean,
}

export interface AppointmentInformation {
  _id: string
  subject: string
  status: string
  sender: string
  participants: Participant[]
  startAt: date | string
  endAt: date | string
  commMethod: string
  commUrl?: string
  note: string
}
