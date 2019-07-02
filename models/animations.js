const mongoose = require("mongoose");
/*
{
	"label": "show",
	"properties": {
		"body": "const {scene} = battleObject;"
		"params": ""
	}
}
*/
const schema = new mongoose.Schema({
	label: String,
	groups: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'groups'
	}],
	properties: {
		type:   {type: String, default: "other"},
		body:   {type: String, default: "callback();"},
		params: {type: String, default: "scene, options, callback"}
	}
});



//
module.exports = mongoose.model('animations', schema);