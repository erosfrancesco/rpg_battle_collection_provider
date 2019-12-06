const mongoose = require("mongoose");

const organizationRoles = new mongoose.Schema({
	organization: {
		type: mongoose.Types.ObjectId,
		ref: "Organization",
		required: true
	},
	roles: {
		type: Number,
		enum: [0, 1, 2, 3],
		default: 3
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		required: true
	}
});
module.exports = mongoose.model('OrganizationRoles', organizationRoles);