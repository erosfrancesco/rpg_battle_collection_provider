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


//test
app.get("/", async (req, res) => {
	await createTestUser("piipo user");
	res.json( await models.User.findByLogin("piipo user") )
});

app.get("/upload", async (req, res) => res.sendFile(__dirname + "/testUpload.html") );



const { connectDb, models } = require('./src/models');

const createTestUser = async username => await models.User({username}).save();

const serverInitResponseHandler = error => console[error ? `error` : `log`](error ||  `server listening on port ${process.env.PORT}`); 
connectDb().then(() => app.listen(process.env.PORT, serverInitResponseHandler) );
