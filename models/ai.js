const mongoose = require("mongoose");
/*
{
	"label": "ai test",
	"properties": {
		"body": "const executor = actor.id;callback();",
		"params": "scene, actor, callback"
	}
}
*/
const schema = new mongoose.Schema({
	label: String,
	properties: {
		body: [String],
		params: [{
			type: String, default: "scene, actor, callback"
		}]
	}
});



//
module.exports = mongoose.model('ai', schema);
