const formidable = require('formidable');
const express = require('express');
const router = express.Router();
const config = require('../config');
const logic = require('../logic/assets.js'); 


router.use(express.json());  
router.get("/", (req, res) => res.json(Object.keys(config.folders.assets)) );

// routes
router.route("/:asset")
.get( (req, res) => {
	const {asset} = req.params;
	const path = config.folders.assets[asset];

	logic(path, (err, files) => {
		if (err) {
			console.log("error in assets router", folder, ":", err);
			res.end();
			return;
		}

		res.json(files);
	}) 
})
.post( (req, res) => {
	const {asset} = req.params;
	const path = config.folders.assets[asset];

	if (!path) {
		res.end();
		return;
	}

	const form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = path + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

	res.json(req.body);
});


/*
Object.keys(config.folders.assets).forEach(folder => router.route("/" + folder)
	.get( (req, res) => logic(config.folders.assets[folder], (err, files) => {
		if (err) {
			console.log("error in assets router", folder, ":", err);
			res.json(err);
			return;
		}

		res.json(files);
	}) )
	.post( (req, res) => {
		res.json(req.body);
	})
)
/**/

module.exports = router;