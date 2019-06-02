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
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'animations'
		}
		/*
		{
			name: String,
			body: String,
			params: {type: String, default: "scene, options, callback"}
    	}
    	*/
    	],
		create: {
			body: String,
			params: {type: String, default: "scene, options, callback"}
		},
		destroy: {
			body: String,
			params: {type: String, default: "scene, options, callback"}
		},
		setup: {
			body: String,
			params: {type: String, default: "scene, options, callback"}
		}
	}
});



//
module.exports = mongoose.model('objects', schema);