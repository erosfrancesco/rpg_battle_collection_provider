const mongoose = require("mongoose");
const {Resource, EncodedFunction, idReference} = require("./utils");

const schema = Resource({
	parent: idReference('groups')
});



//
module.exports = mongoose.model('groups', schema);