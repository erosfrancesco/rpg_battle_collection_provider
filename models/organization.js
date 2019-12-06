const mongoose = require("mongoose");
// const UserRoles = new mongoose.Schema({
// 	roles: {
// 		type: Number,
// 		enum: [0, 1, 2, 3],
// 		default: 3
// 	},
// 	user: {
// 		type: mongoose.Types.ObjectId,
// 		ref: "User",
// 		required: true
// 	}
// });

const schema = new mongoose.Schema({
	admin: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		required: true
	},
	name: String
});

module.exports = mongoose.model('Organization', schema);