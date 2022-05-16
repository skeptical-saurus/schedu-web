import { AppointmentTC } from 'models/appointment'

export const createAppointment = AppointmentTC.mongooseResolvers.createOne()

export const updateAppointment = AppointmentTC.mongooseResolvers.updateOne()

