const mongoose = require("mongoose");
const {Resource, EncodedFunction} = require("../utils");
/*
{
	"label": "ai test",
	"properties": {
		"body": "const executor = actor.id;callback();",
		"params": "scene, actor, callback"
	}
}
*/
const schema = Resource(
	EncodedFunction("scene, options, callback", "callback();")
);

//
module.exports = mongoose.model('ai', schema);
