const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    newsletter: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  {
    timestamps: true
  }
)

module.exports = User = mongoose.model("User", UserSchema)