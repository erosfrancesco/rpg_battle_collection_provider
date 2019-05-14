const mongoose = require("mongoose");
/*
{
	"label": "DamageDigits",
	"properties": {
		"animations": [
			{
				"name": "show",
				"body": "const {scene} = battleObject;"
				"params": ""
			}
		],
		"build": {
			"body": const {x, y, text} = options;
			"params": ""
		},
		"destroy": {
			"body": const {x, y, text} = options;
			"params": ""
		},
		"preload": {
			"body": const {x, y, text} = options;
			"params": ""
		}
	}
}
*/
const schema = new mongoose.Schema({
	label: String,
	properties: {
		animations: [{
			name: String,
			body: String,
			params: {type: String, default: "scene, options, callback"}
    	}],
		build: {
			body: String,
			params: {type: String, default: "scene, options, callback"}
		},
		destroy: {
			body: String,
			params: {type: String, default: "scene, options, callback"}
		},
		preload: {
			body: String,
			params: {type: String, default: "scene, options, callback"}
		}
	}
});



//
module.exports = mongoose.model('objects', schema);