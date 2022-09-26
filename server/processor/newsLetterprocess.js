const broadcastMail = require('../mail/broadcastMail')

const newsLetterprocess = async (job, done) => {
  try {
    const { name, email } = job.data.user
    await broadcastMail({ name, email })
    done()
  } catch (error) {
    console.log(error)
  }
}

module.exports = newsLetterprocess