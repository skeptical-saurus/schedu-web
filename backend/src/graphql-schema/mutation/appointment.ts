import { AccountModel } from 'models/account'
import { AppointmentTC } from 'models/appointment'

export const createAppointment = AppointmentTC.mongooseResolvers
  .createOne()
  .wrapResolve((next) => async (rp) => {
    if (!rp.context.user) {
      throw Error('Unauthorized')
    }

    const googleId = rp.context.user.uid
    const self = await AccountModel.findOne({ googleId }).lean()

    rp.args.record.sender = self?._id

    return next(rp)
  })

export const updateAppointment = AppointmentTC.mongooseResolvers.updateOne()

export const deleteAppointment = AppointmentTC.mongooseResolvers.removeById()
