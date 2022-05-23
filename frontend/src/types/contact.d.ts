export interface ContactInformation {
  _id: string
  googleId: string
  businessId: string
  firstName: string
  lastName: string
  image: string
  contact: {
    email: string
    tel: string
  }
}
