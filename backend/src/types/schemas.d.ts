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
