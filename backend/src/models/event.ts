import { composeMongoose } from 'graphql-compose-mongoose'
import mongoose from 'mongoose'

import type { Event } from 'types/schemas'

const eventSchema = new mongoose.Schema<Event>({
  title: String,
  date: Date,
})

export const EventModel = mongoose.model<Event>('Event', eventSchema)

export const EventTC = composeMongoose(EventModel)
