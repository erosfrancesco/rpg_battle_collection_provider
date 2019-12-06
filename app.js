/*********************************************************************/
/* PROCESS */
/*********************************************************************/
const app = require('express')();
const cors = require('cors');
require("dotenv").config()


// app.use(cors());
app.use(require("./routings"));
require("./controllers/db")(app)

//app.get("/upload", async (req, res) => res.sendFile(__dirname + "/testUpload.html") );

