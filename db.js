const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

process.env.MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://jester:Bondrewd717@rpgbattle-eztzq.mongodb.net/test?retryWrites=true"


const db = mongoose.connect(process.env.MONGODB_URL).then(
  () => { 
  	console.log("connected to db")
  },
  err => console.log("failed to connect:", err)
);


// If the Node process ends, close the Mongoose connection
const gracefulExit = () => mongoose.connection.close(() => {
    console.log('Mongoose has been disconnected through app termination');
    process.exit(0);
});
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

module.exports = db;
