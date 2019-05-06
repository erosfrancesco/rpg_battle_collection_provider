/*********************************************************************/
/* PROCESS */
/*********************************************************************/
process.chdir(__dirname);


const express = require('express');
const config = require('./config');
const app = express();

const assets = require('./routings/assets.js');
app.use('/assets', assets);

const groups = require('./routings/groups.js');
app.use('/groups', groups);

const categories = require('./routings/categories.js');
app.use('/categories', categories);

//upload test
app.get("/", (req, res) => res.sendFile(__dirname + "/testUpload.html"))


app.listen(config.port, error => console[error ? `error` : `log`](error ||  `server listening on port ${config.port}`));
