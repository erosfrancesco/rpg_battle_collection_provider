/*********************************************************************/
/* PROCESS */
/*********************************************************************/
const app = require('express')();

process.env.PORT = process.env.PORT || 80;

// routes for categories
const categoryRouting = require("./routings");
app.use(categoryRouting);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



/*
const serverInitResponseHandler = error => console[error ? `error` : `log`](error ||  `server listening on port ${process.env.PORT}`); 
app.listen(process.env.PORT, serverInitResponseHandler);
/**/


//app.get("/upload", async (req, res) => res.sendFile(__dirname + "/testUpload.html") );
const serverInitResponseHandler = error => console[error ? `error` : `log`](error ||  `server listening on port ${process.env.PORT}`); 
const connectToDb = require("./db");
connectToDb((err, res) => app.listen(process.env.PORT, serverInitResponseHandler) );

