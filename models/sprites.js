const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	label: String,
	groups: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'groups'
	}],
	properties: {
		src: String,

		frameWidth:  { type: Number, default: 100 },
		frameHeight: { type: Number, default: 100 },
		
		frameX: { type: Number, default: 0 },
		frameY: { type: Number, default: 0 },
		
		scaleX: { type: Number, default: 100 },
		scaleY: { type: Number, default: 100 },
	}
});



//
module.exports = mongoose.model('sprites', schema);