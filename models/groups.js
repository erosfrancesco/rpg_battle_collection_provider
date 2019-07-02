const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	label: String,
	properties: {
		parent: {
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'groups'
		}
	}
});



//
module.exports = mongoose.model('groups', schema);