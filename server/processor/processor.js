const queue = require('bull')
const { REDIS_PORT, REDIS_URI } = require('../config/redis')
const path = require('path')

const emailQueue = new queue('emailQueue', {
  redis: {
    REDIS_PORT,
    REDIS_URI
  }
})

const newsLetterEmailQueue = new queue('newsLetterEmailQueue', {
  redis: {
    REDIS_PORT,
    REDIS_URI
  }
})

// use .process for any kind of logic that to perform over queue
emailQueue.process(path.join(__dirname, 'emailQueueProcess.js'))
newsLetterEmailQueue.process(path.join(__dirname, 'emailQueueProcess.js'))

//to check the progress of the on going jobs
emailQueue.on('completed', (job) => {
  console.log("current job id:", job.id)
})

newsLetterEmailQueue.on('completed', (job) => {
  console.log("current newsletter job id:", job.id)
})
