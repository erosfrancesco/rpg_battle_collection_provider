const mongoose = require("mongoose");
const {Resource, EncodedFunction} = require("../utils");

/*
	{
		"label": "Fight",
		"properties": {
			"label": "Attack",
			"action": "const {actor, menu} = options;\nconst {Menus, Enemies, Players} = scene;"
		}
	}
*/

const schema = Resource({
	label: String,
	action: EncodedFunction("scene, options, callback")
});



//
module.exports = mongoose.model('commands', schema);