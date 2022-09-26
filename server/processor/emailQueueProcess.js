const confirmationMail = require('../mail/confirmationMail')

const emailQueueProcess = async (job, done) => {
  try {
    const { name, email } = job.data.user
    await confirmationMail({ name, email })
    done()
  } catch (error) { 
    console.log(error)
  }
}

module.exports = emailQueueProcess