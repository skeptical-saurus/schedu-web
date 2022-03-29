import mongoose from "mongoose"

const Schema = mongoose.Schema

const accountSchema = new Schema({
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

export default accountSchema
