// vars
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


//oldone: mongodb+srv://jester:Bondrewd717@rpgbattle-eztzq.mongodb.net/main?retryWrites=true

process.env.MONGODB_USER = process.env.MONGODB_USER || "jester"//"madhatter";
process.env.MONGODB_PASS = process.env.MONGODB_PASS || "Bondrewd717"//"Z8MfHgBd76RGvGvk";
process.env.MONGODB_URL  = process.env.MONGODB_URL  || "@rpgbattle-eztzq.mongodb.net/main?retryWrites=true";

const url = "mongodb+srv://" + process.env.MONGODB_USER  + ":" + process.env.MONGODB_PASS + process.env.MONGODB_URL;


// If the Node process ends, close the Mongoose connection
const gracefulExit = () => mongoose.connection.close(() => {
    console.log('Mongoose has been disconnected through app termination');
    process.exit(0);
});
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);


// Export as connection function
module.exports = callback => mongoose.connect(url).then(
	res => { 
		console.log("connected to db");
		callback(null, res);
	},
	err => {
		console.error("failed to connect:", err);
		callback(err);
});