const mongoose = require("mongoose");
/*
{
	"label": "Dissing",
	"properties": {
		"build": "",
		"resolve": "execute();",
		"imports": ""
	}
}
*/
const schema = new mongoose.Schema({
	label: String,
	properties: {
		create: {
			body: String,
			params: {
				type: String, default: "scene", "action", "executor", "target", "options"
			}
		},
		resolve: {
			body: String,
			params: {
				type: String, default: "scene", "action", "executor", "target", "options"
			}
		},
		setup: {
			body: String,
			params: {
				type: String, default: "scene, options, callback"
			}
		}
	}
});



//
module.exports = mongoose.model('actions', schema);
