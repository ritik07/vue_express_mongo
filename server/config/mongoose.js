const mongoose = require('mongoose')

const connectDB = () => {
  console.log('connecting...')
  const URI = "mongodb+srv://ritik:ritik@cluster0.cudscyw.mongodb.net/?retryWrites=true&w=majority";
  mongoose.connect(URI).then(success => console.log("success")).catch((err) => console.error(err))
}

module.exports = connectDB