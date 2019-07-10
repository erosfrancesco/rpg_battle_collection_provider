const mongoose = require("mongoose");
const {Resource, EncodedFunction, idReference} = require("./utils");
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
const schema = Resource({
	animations: [ idReference('animations') ],
	create:  EncodedFunction("scene, battleObject, options, callback"),
	destroy: EncodedFunction("scene, battleObject, options, callback"),
	setup:   EncodedFunction("scene, options, callback"),
	type: { type: String, default: "generic" }
});



//
module.exports = mongoose.model('objects', schema);