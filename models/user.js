const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const schema = new mongoose.Schema({
	username: {
		type: String,
		trim: true,
		required: true
	},
	hash: {
		type: String,
		trim: true,
		required: true
	}
});

// hash user password before saving into database
schema.pre('save', next => {
	// console.log("saving ", this, this.password)
	this.hash = bcrypt.hashSync(this.hash, saltRounds);
	next();
});


//
module.exports = mongoose.model('User', schema);