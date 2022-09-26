const nodemailer = require('nodemailer')

//config
const transpoter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7be4f617a4cbff",
    pass: "6e2bc55d450f5c"
  }
})

//verify
transpoter.verify((err, success) => {
  if (err) {
    console.error("err", err)
  } else {
    console.log("nodemail is connected")
  }
})

module.exports = transpoter