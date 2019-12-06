const mongoose = require("mongoose");
const categories = require("../models/categories")
const {validateRef} = require("./utils")

const schema = new mongoose.Schema({
	active: {
		type: Boolean,
		default: false
	},
	category: {
		type: String,
		required: true,
		enum: Object.keys(categories)
	},
	resource: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		refPath: 'category'
	},
	user: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: 'User'
	}
});

validateRef(schema.path("resource"))
validateRef(schema.path("user"))


module.exports = mongoose.model('Sharing', schema);