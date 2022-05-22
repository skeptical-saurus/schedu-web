import { AccountTC } from 'models/account'

export const accounts = AccountTC.mongooseResolvers.findMany().wrapResolve((next) => (rp) => {
  rp.args.filter = {
    googleId: {
      $ne: rp.context.user.uid,
    },
  }
  return next(rp)
})

export const account = AccountTC.mongooseResolvers.findById()

export const currentAccount = AccountTC.mongooseResolvers.findOne().wrapResolve((next) => (rp) => {
  rp.args.filter = {
    googleId: rp.context.user.uid,
  }
  return next(rp)
})
