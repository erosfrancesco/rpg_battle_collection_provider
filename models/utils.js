const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const resourceExists = (category, id) => mongoose.Model[category].exists({ _id: id })

const idReference = ref => {
	if (ref.refPath) {
		return {
			type: ObjectId,
			refPath: ref.refPath
		}
	}
	return {
		type: ObjectId, 
		ref
	}
}

// Can't use arrow function here
const validateRef = function (schemaPath) {
	schemaPath.validate(function(v) {
		const {ref, refPath} = schemaPath.options
		const category = ref ? ref : this[refPath]
		const Model = mongoose.model(category)
	
		Model.countDocuments({ _id: v }).then(function(count) {
			if (count && count > 0) {
				return true
			}
			throw new Error("Resource not found: " + v)
		}, function(err) {
			throw new Error("Generic error: " + err)
		})
	}, 'Resource not found');
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
	label: String,
	properties,
	
	groups: [idReference('groups')],
	owner: idReference('User')
});


//
module.exports = { Resource, EncodedFunction, idReference, resourceExists, validateRef };