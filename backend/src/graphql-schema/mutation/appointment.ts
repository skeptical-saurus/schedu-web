import { ResolverResolveParams, ResolverRpCb } from 'graphql-compose'
import { scheduleAppointmentUpdate } from 'helpers/schedule'
import { AccountModel } from 'models/account'
import { AppointmentTC } from 'models/appointment'
import { ApolloContext } from 'types/apollo'
import { Appointment, Participant } from 'types/schemas'

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

        const participants = rp.args.record.participants.map((participant: Participant) => ({
          ...participant,
          confirmed: false,
        }))

        rp.args.record = {
          ...rp.args.record,
          participants,
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

export const approveAppointment = AppointmentTC.mongooseResolvers
  .updateById({ record: { isRequired: false } })
  .wrapResolve((next) => async (rp) => {
    const googleId = rp.context.user.uid

    const targetAccount = await AccountModel.findOne({ googleId })

    rp.args.record = {
      status: 'ongoing',
      participants: {
        userId: targetAccount?._id,
        confirmed: true,
      },
    }

    return next(rp)
  })

export const rejectAppointment = AppointmentTC.mongooseResolvers
  .updateById({ record: { isRequired: false } })
  .wrapResolve((next) => (rp) => {
    rp.args.record = { status: 'abandoned' }
    return next(rp)
  })

export const deleteAppointment = AppointmentTC.mongooseResolvers.removeById()
