import { AccountTC } from 'models/account'

export const createAccount = AccountTC.mongooseResolvers.createOne().wrapResolve((next) => (rp) => {
  if (!rp.context.user.uid) throw new Error('Not allowed')
  rp.args.record.googleId = rp.context.user.uid
  return next(rp)
})

export const updateAccount = AccountTC.mongooseResolvers.updateOne().wrapResolve((next) => (rp) => {
  if (rp.args.record.googleId && rp.args.record.googleId != rp.context.user.uid)
    throw new Error('Not allowed')
  return next(rp)
})
