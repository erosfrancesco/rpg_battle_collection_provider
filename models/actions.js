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
		build: {
			body: String,
			params: {
				type: String, default: "scene, actor, callback"
			}
		},
		resolve: {
			body: String,
			params: {
				type: String, default: "scene, actor, callback"
			}
		},
		imports: {
			body: String,
			params: {
				type: String, default: "scene, actor, callback"
			}
		}
	}
});



//
module.exports = mongoose.model('actions', schema);