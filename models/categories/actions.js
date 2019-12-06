const mongoose = require("mongoose");
const {Resource, EncodedFunction} = require("../utils");
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
const schema = Resource({
	create:  EncodedFunction("scene, action, executor, target, options"),
	resolve: EncodedFunction("scene, action, executor, target, options, callback"),
	setup:   EncodedFunction("scene")
});



//
module.exports = mongoose.model('actions', schema);
