const mongoose = require("mongoose");
const {Resource, EncodedFunction} = require("../utils");
/*
{
	"label": "show",
	"properties": {
		"type": ""
		"body": "const {scene} = battleObject;"
		"params": ""
	}
}
*/
const schema = Resource( 
	EncodedFunction("scene, options, callback", "callback();", { type: {type: String, default: "other"} })
);



//
module.exports = mongoose.model('animations', schema);