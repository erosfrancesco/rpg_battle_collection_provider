const mongoose = require("mongoose");

const sprites = new mongoose.Schema({
	label: String,
	src: String,
	frameWidth: Number,
	frameHeight: Number,
	frameX: Number,
	frameY: Number,
	scaleX: Number,
	scaleY: Number
});



//
module.exports = mongoose.model('sprites', sprites);