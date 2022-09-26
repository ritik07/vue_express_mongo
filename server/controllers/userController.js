const User = require('../models/user')
const confirmationMail = require("../mail/confirmationMail");
const Queue = require('bull')
const { v4: uuidv4 } = require("uuid")
const { REDIS_PORT, REDIS_URI } = require('../config/redis')

const emailQueue = new Queue('emailQueue', {
  redis: {
    REDIS_PORT,
    REDIS_URI
  }
})

const newsLetterEmailQueue = new Queue('newsLetterEmailQueue', {
  redis: {
    REDIS_PORT,
    REDIS_URI
  }
})

exports.create = async (req, res) => {
  const { name, email } = req.body;
  try {
    //mongo query
    const user = await User.create({ name, email })

    //send email
    await confirmationMail({ name, email });
    res.json(user)
  } catch (error) {
    res.status(400).json(error)
    console.log("error", error)
  }
}

exports.getAllUser = async (req, res) => {
  try {
    const allUsers = await User.find()
    // res.status(400).json("API ERROR")
    res.status(200).json({
      data: allUsers
    })
  } catch (error) {
    res.status(400).json(error)
  }
}

exports.subscribeNewsletter = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { 'newsletter': true }).then((result) => {
      res.send(result)
    }).catch((err) => res.send(err))
  } catch (err) {
    res.status(400).json(error)
  }
}

const sendNewsLetter = async () => {
  try {
    const allUsers = await User.find({ 'newsletter': true }).then((users) => {
      return users
    })
    allUsers.forEach((user, index) => {
      newsLetterEmailQueue.add({ user }, { repeat: { cron: '1 17 * * *' }, jobId: uuidv4() }).then(() => {
        if (index + 1 === allUsers.length) {
          console.log('All users are added to cron queue')
        }
      });
    })
  } catch (error) {
    console.log("err", error)
  }
}

sendNewsLetter()


exports.sendEmailToUsers = async (req, res) => {
  try {
    const allUsers = await User.find()
    allUsers.forEach((user, index) => {

      emailQueue.add({ user }, {
        attempts: 1,
        // backoff: 5000 // static 5 sec delay between retry
      }).then(() => {
        if (index + 1 === allUsers.length) {
          res.status(200).json({
            message: "All users are added to queue"
          })
        }
      })

      //for visual view
      // emailQueue.add('emailtouser', { user }).then(() => {
      //   if (index + 1 === allUsers.length) {
      //     res.status(200).json({
      //       message: "All users are added to queue"
      //     })
      //   }
      // })
    })

  } catch (error) {
    res.status(400).json(error)
    console.log("error", error)
  }
}