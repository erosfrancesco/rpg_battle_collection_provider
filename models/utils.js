const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;


const idReference = ref => {
	return {
		type: ObjectId, 
		ref
	}
}

const EncodedFunction = (paramsDefault, bodyDefault, otherProps) => {
	let ret = {
		params: { type: String },
		body:   { type: String }
	};

	if (paramsDefault) {
		ret.params = Object.assign(ret.params, { default: paramsDefault })
	}

	if (bodyDefault) {
		ret.body = Object.assign(ret.body, { default: bodyDefault })
	}

	if (otherProps) {
		ret = Object.assign(ret, otherProps);
	}

	return ret
};


const Resource = (properties = {}) => new mongoose.Schema({
	groups: [idReference('groups')],
	label: String,
	properties,
	user: [idReference('User')]
});


//
module.exports = { Resource, EncodedFunction, idReference };