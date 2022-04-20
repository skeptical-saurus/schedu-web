import { composeMongoose } from 'graphql-compose-mongoose'
import mongoose from 'mongoose'

import type { Account } from 'types/schemas'

const accountSchema = new mongoose.Schema<Account>({
  googleId: String,
  businessId: String,
  firstName: String,
  lastName: String,
  contact: {
    email: String,
    tel: String,
  },
  image: String,
  setting: {
    displayTel: Boolean,
    weekendReceive: Boolean,
    activeTime: {
      startAt: String,
      endAt: String,
    },
  },
})

export const AccountModel = mongoose.model<Account>('Account', accountSchema)

export const AccountTC = composeMongoose(AccountModel)
