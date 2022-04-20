import { AccountTC } from 'models/account'

export const accounts = AccountTC.mongooseResolvers.findMany()
export const accountId = AccountTC.mongooseResolvers.findOne()
