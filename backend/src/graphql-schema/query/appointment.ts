import { AppointmentTC } from 'models/appointment'
import { AccountModel } from 'models/account'
import { count } from 'graphql-compose-mongoose/lib/resolvers/count'

export const appointments = AppointmentTC.mongooseResolvers
  .findMany()
  .wrapResolve((next) => async (rp) => {
    const googleId = rp.context.user.uid

    const target = await AccountModel.findOne({ googleId })

    rp.args.filter = {
      $or: [{ sender: target?._id }, { 'participants.userId': target?._id }],
    }

    return next(rp)
  })

export const countAppointment = AppointmentTC.mongooseResolvers
  .count()
  .wrapResolve((next) => async (rp) => {
    const googleId = rp.context.user.uid

    const target = await AccountModel.findOne({ googleId })

    rp.args.filter = {
      $or: [{ sender: target?._id }, { 'participants.userId': target?._id }],
    }

    return next(rp)
  })

export const appointment = AppointmentTC.mongooseResolvers.findOne()
