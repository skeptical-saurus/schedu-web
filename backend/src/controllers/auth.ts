import type { DecodedIdToken } from 'firebase-admin/auth'
import { AccountModel } from 'models/account'

const DEFAULT_START_AT = '08:30'
const DEFAULT_END_AT = '16:30'

export const createNewUser = async (data: DecodedIdToken) => {
  const emailAccount = data.email?.split('@')[0]
  const isStudent = !isNaN(Number(emailAccount))
  const businessId = isStudent ? emailAccount : ''
  const role = isStudent ? 'student' : 'professor'
  const [firstName, lastName] = data.name.split(' ')

  const user = new AccountModel({
    googleId: data.uid,
    businessId: businessId,
    firstName: firstName,
    lastName: lastName,
    role: role,
    contact: {
      email: data.email,
      tel: null,
    },
    image: data.picture,
    setting: {
      displayTel: false,
      weekendReceive: false,
      activeTime: {
        startAt: DEFAULT_START_AT,
        endAt: DEFAULT_END_AT,
      },
    },
  })

  return await user.save()
}

export const getUserFromGoogleId = async (googleId: string) => {
  return await AccountModel.findOne({ googleId: googleId })
}
