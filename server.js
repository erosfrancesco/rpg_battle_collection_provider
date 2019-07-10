/*********************************************************************/
/* PROCESS */
/*********************************************************************/
const app = require('express')();
const cors = require('cors')

process.env.PORT = process.env.PORT || 80;


app.use(cors());


// routes for categories
const categoryRouting = require("./routings");
app.use(categoryRouting);



//app.get("/upload", async (req, res) => res.sendFile(__dirname + "/testUpload.html") );
const serverInitResponseHandler = error => console[error ? `error` : `log`](error ||  `server listening on port ${process.env.PORT}`); 
const connectToDb = require("./db");
connectToDb((err, res) => app.listen(process.env.PORT, serverInitResponseHandler) );

