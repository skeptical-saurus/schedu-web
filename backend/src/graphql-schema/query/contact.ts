import { ResolverResolveParams, schemaComposer } from 'graphql-compose'

import { AccountModel, AccountTC } from 'models/account'
import { AppointmentModel } from 'models/appointment'
import { ApolloContext } from 'types/apollo'
import { Account } from 'types/schemas'

export const recentContacts = schemaComposer.createResolver({
  name: 'recentContacts',
  kind: 'query',
  type: AccountTC.mongooseResolvers.findMany().getType(),
  resolve: async ({ context }: ResolverResolveParams<Account, ApolloContext>) => {
    if (!context.user) {
      return []
    }

    const googleId = context.user.uid
    const self = await AccountModel.findOne({ googleId }).lean()

    const relatedAppointment = await AppointmentModel.find({
      $or: [{ sender: self?._id }, { 'participants.userId': self?._id }],
    }).lean()

    const contactIds = relatedAppointment.flatMap(({ sender, participants }) => [
      sender,
      ...participants.map(({ userId }) => userId),
    ])

    const uniqueContactIds = Array.from(new Set(contactIds))

    const records = await AccountModel.find({ _id: { $in: uniqueContactIds, $ne: self?._id } })
      .limit(4)
      .lean()
    return records
  },
})
