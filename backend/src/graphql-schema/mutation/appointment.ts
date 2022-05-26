import { ResolverResolveParams, ResolverRpCb } from 'graphql-compose'
import { scheduleAppointmentUpdate } from 'helpers/schedule'
import { AccountModel } from 'models/account'
import { AppointmentTC } from 'models/appointment'
import { ApolloContext } from 'types/apollo'
import { Appointment } from 'types/schemas'

export const createAppointment = AppointmentTC.mongooseResolvers
  .createOne()
  .wrapResolve(
    (next: ResolverRpCb<Appointment, ApolloContext>) =>
      async (rp: ResolverResolveParams<Appointment, ApolloContext>) => {
        if (!rp.context.user) {
          throw Error('Unauthorized')
        }

        const googleId = rp.context.user.uid
        const self = await AccountModel.findOne({ googleId }).lean()

        rp.args.record = {
          ...rp.args.record,
          sender: self?._id,
          status: 'pending',
        }

        rp.beforeRecordMutate = async function (apm: Appointment) {
          scheduleAppointmentUpdate(apm)
          return apm
        }

        return next(rp)
      }
  )

export const updateAppointment = AppointmentTC.mongooseResolvers.updateOne()

export const deleteAppointment = AppointmentTC.mongooseResolvers.removeById()
