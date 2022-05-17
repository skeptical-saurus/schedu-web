import { composeMongoose } from 'graphql-compose-mongoose'
import mongoose from 'mongoose'

import type { Appointment, Participant } from 'types/schemas'

const participantSchema = new mongoose.Schema<Participant>({
  userId: String,
  main: Boolean,
  confirmed: Boolean,
  join: Boolean,
})

const appointmentSchema = new mongoose.Schema<Appointment>(
  {
    subject: String,
    status: String,
    sender: String,
    participants: [participantSchema],
    startAt: Date,
    endAt: Date,
    commMethod: String,
    commUrl: String,
    note: String,
  },
  {
    timestamps: true,
  }
)

export const AppointmentModel = mongoose.model<Appointment>('Appointment', appointmentSchema)

export const AppointmentTC = composeMongoose(AppointmentModel)
