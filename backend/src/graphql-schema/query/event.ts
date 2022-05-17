import { EventTC } from "models/event";

export const events = EventTC.mongooseResolvers.findMany()

export const event = EventTC.mongooseResolvers.findOne()