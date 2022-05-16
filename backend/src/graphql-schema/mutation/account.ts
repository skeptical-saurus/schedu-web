import { AccountTC } from 'models/account'

export const updateAccount = AccountTC.mongooseResolvers.updateOne().wrapResolve((next) => (rp) => {
  rp.args.filter = {
    googleId: rp.context.user.uid,
  }
  return next(rp)
})
