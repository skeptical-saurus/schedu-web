export interface account {
  _id: string
  googleId: string
  bussiness: string
  firstName: string
  lastName: string
  contract: {
    email: string
    tel: string
  }
  image: string
  setting: {
    displayTel: boolean
    weekendReceive: boolean
    activeTime: {
      startAt: string
      endAt: string
    }
  }
}
