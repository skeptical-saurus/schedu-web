import mongoose from 'mongoose'

export interface Account extends mongoose.Document {
  googleId: string
  businessId: string
  firstName: string
  lastName: string
  contact: {
    email: string
    tel: string
  }
  image: string
  setting: {
    displayTel: boolean
    weekendReceive: boolean
    activeTime: {
      startAt: string
      endAt: string
    }
  }
}

export interface Participant {
  userId: string
  main: boolean
  confirmed: boolean
  join: boolean
}

export interface Appointment extends mongoose.Document {
  subject: string
  status: string
  sender: string
  participants: Participant[]
  startAt: Date
  endAt: Date
  commMethod: string
  commUrl: string
  note: string
}

export interface Event extends mongoose.Document {
  title: string
  date: Date
}
