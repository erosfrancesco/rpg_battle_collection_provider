const mongoose = require("mongoose");

/*
	{
		"label": "Fight",
		"properties": {
			"label": "Attack",
			"action": "const {actor, menu} = options;\nconst {Menus, Enemies, Players} = scene;"
		}
	}
*/

const schema = new mongoose.Schema({
	label: String,
	properties: {
		label: String,
		action: {
			body: String,
			params: {type: String, default: "scene, options, callback"}
		}
	}
});



//
module.exports = mongoose.model('commands', schema);