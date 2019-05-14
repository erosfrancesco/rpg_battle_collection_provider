const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	label: String,
	properties: {
		src: String,
		frameWidth: Number,
		frameHeight: Number,
		frameX: Number,
		frameY: Number,
		scaleX: Number,
		scaleY: Number
	}
});



//
module.exports = mongoose.model('sprites', schema);