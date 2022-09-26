const express = require('express')
const cors = require('cors')
const userRoutes = require("./routes/users/users");
const connectMongoose = require('./config/mongoose')
require('./mail/transpoter')
require('./processor/processor')
//
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const Queue = require('bull')
const { REDIS_PORT, REDIS_URI } = require('./config/redis')

const app = express()


const run = async () => {
  const app = express();
  
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
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/ui');

  createBullBoard({
    queues: [new BullMQAdapter(emailQueue), new BullMQAdapter(newsLetterEmailQueue)],
    serverAdapter,
  });

  app.use('/ui', serverAdapter.getRouter());

  // app.use('/add', (req, res) => {
  //   const opts = req.query.opts || {};

  //   if (opts.delay) {
  //     opts.delay = +opts.delay * 1000; // delay must be a number
  //   }

  //   emailQueue.add('Add', { title: req.query.title }, opts);

  //   res.json({
  //     ok: true,
  //   });
  // });

  //connect db
  connectMongoose()

  //middleware
  app.use(express.urlencoded())
  app.use(express.json())

  app.use(cors())

  //routes
  app.use("/users", userRoutes);

  app.listen(5001, () => {
    console.log('Running on 5001...');
    console.log('For the UI, open http://localhost:5001/ui');
    console.log('Make sure Redis is running on port 6379 by default');
    console.log('To populate the queue, run:');
    console.log('  curl http://localhost:5001/add?title=Example');
    console.log('To populate the queue with custom options (opts), run:');
    console.log('  curl http://localhost:5001/add?title=Test&opts[delay]=9');
  });
};

// eslint-disable-next-line no-console
run().catch((e) => console.error(e));

// const port = process.env.PORT || 5001;

// app.listen(port, () => console.log(`server running on ${port}`))