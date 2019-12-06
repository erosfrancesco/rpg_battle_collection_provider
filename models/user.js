const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 12;

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
	},

	mail: {
		type: String
	},
	organization: {
		type: mongoose.Types.ObjectId,
		ref: "Organization"
	}
});

// hash user password before saving into database
schema.pre('save', function(next) {
	this.hash = bcrypt.hashSync(this.hash, saltRounds);
	next();
});

module.exports = mongoose.model('User', schema);