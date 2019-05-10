/*********************************************************************/
/* PROCESS */
/*********************************************************************/
const express = require('express');
const app = express();

process.env.PORT = process.env.PORT || 80;


// Mongoose middleware
const models = require("./models")
app.use(async (req, res, next) => {
	req.context = { models };
	next();
});



//
app.get("/", async (req, res) => {
	
	const {Kitten} = req.context.models;
	//const filters = { name: /^fluffy/ };
	const filters = {};
	Kitten.find(filters, (err, kittens) => {
		if (err) {
			res.status(500).json(err);
			return console.error(err);
		}
		res.json(kittens);
	});
});

app.post("/", async (req, res) => {

	const {Kitten} = req.context.models;
	const fluffy = new Kitten({ name: 'kit' });

	fluffy.save((err, fluffy) => {
		if (err) {
			res.status(500).json(err);
			return console.error(err);
		}
		console.log("fluffy saved")
		const meow = fluffy.meow();
		res.json({meow})
	});
});
/**/

/*
const serverInitResponseHandler = error => console[error ? `error` : `log`](error ||  `server listening on port ${process.env.PORT}`); 
app.listen(process.env.PORT, serverInitResponseHandler);
/**/


app.get("/upload", async (req, res) => res.sendFile(__dirname + "/testUpload.html") );
const serverInitResponseHandler = error => console[error ? `error` : `log`](error ||  `server listening on port ${process.env.PORT}`); 
const db = require("./db");
db.then(() => app.listen(process.env.PORT, serverInitResponseHandler) );
/**/

