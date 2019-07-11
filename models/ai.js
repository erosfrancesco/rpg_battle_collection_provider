const mongoose = require("mongoose");
const {Resource, EncodedFunction} = require("./utils");
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


// {
// 	label: String,
// 	groups: [{
// 		type: mongoose.Schema.Types.ObjectId, 
// 		ref: 'groups'
// 	}],
// 	properties: {
// 		body: String,
// 		params: {
// 			type: String, default: "scene, actor, callback"
// 		}
// 	}
// });



//
module.exports = mongoose.model('ai', schema);
