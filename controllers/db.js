const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

require('dotenv').config()


// If the Node process ends, close the Mongoose connection
const gracefulExit = () => mongoose.connection.close(() => {
    console.log('Mongoose has been disconnected through app termination');
    process.exit(0);
});
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);


const serverInitResponseHandler = error => console[error ? `error` : `log`](error ||  `server listening on port ${process.env.PORT}`); 

module.exports = app => mongoose.connect(process.env.MONGODB_URL)
.then(app.listen(process.env.PORT, err => serverInitResponseHandler(err) ))