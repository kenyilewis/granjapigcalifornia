const mongoose = require('mongoose');
const { config } = require('../config');

const { uri, options } = config;
// Connection to MongoDB with mongoose
mongoose.connect(uri, options);

const db = mongoose.connection;
db.once('open', () => {
  console.info(`Connected to MongoDB: ${uri} `);
});
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;

// async function connectDB(cb) {
//   try {
//     const client = await mongoose.connect(uri, options);
//     cb();
//     client.
//   } catch (error) {
//     console.error(error);
//   }
// }
