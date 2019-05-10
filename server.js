/*********************************************************************/
/* PROCESS */
/*********************************************************************/
const express = require('express');
const app = express();
const models = require("./models");

process.env.PORT = process.env.PORT || 80;


// Mongoose middleware
app.use(async (req, res, next) => {
	req.context = { models };
	next();
});

// body-parser goodbye!
app.use(express.json());


/*
app.get("/", async (req, res) => {
	const {Sprites} = req.context.models;

	const filters = {};
	Sprites.find(filters, (err, items) => {
		if (err) {
			res.status(500).json(err);
			return console.error(err);
		}
		res.json(items);
	});
});

app.post("/", async (req, res) => {
	const {Sprites} = req.context.models;
	const itemToBeSaved = new Sprites(req.body);

	itemToBeSaved.save((err, item) => {
		if (err) {
			res.status(500).json(err);
			return console.error(err);
		}
		
		res.json(item)
	});
});
/**/

/*
const serverInitResponseHandler = error => console[error ? `error` : `log`](error ||  `server listening on port ${process.env.PORT}`); 
app.listen(process.env.PORT, serverInitResponseHandler);
/**/


app.get("/upload", async (req, res) => res.sendFile(__dirname + "/testUpload.html") );
const serverInitResponseHandler = error => console[error ? `error` : `log`](error ||  `server listening on port ${process.env.PORT}`); 
const connectToDb = require("./db");
connectToDb((err, res) => app.listen(process.env.PORT, serverInitResponseHandler) );


app.route("/sprites")
.get(async (req, res) => {
	const {Sprites} = req.context.models;

	const filters = {};
	Sprites.find(filters, (err, items) => {
		if (err) {
			res.status(500).json(err);
			return console.error(err);
		}
		res.json(items);
	});
})
.post(async (req, res) => {
	const {Sprites} = req.context.models;
	const itemToBeSaved = new Sprites(req.body);

	itemToBeSaved.save((err, item) => {
		if (err) {
			res.status(500).json(err);
			return console.error(err);
		}
		
		res.json(item);
	});
})



