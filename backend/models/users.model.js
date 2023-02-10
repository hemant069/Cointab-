const {Schema, model} = require("mongoose")

const UserSchema = new Schema({
  name: {
    type: Object,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  large:{
    type: String,
    required: true,
  }
})

const UserModel = model("users", UserSchema)

module.exports = UserModel
