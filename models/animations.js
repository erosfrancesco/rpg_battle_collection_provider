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
	properties: {
		body:   {type: String, default: ""},
		params: {type: String, default: "scene, options, callback"}
	}
});



//
module.exports = mongoose.model('animations', schema);