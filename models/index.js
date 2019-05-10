const mongoose = require("mongoose");

const kittySchema = new mongoose.Schema({name: String});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.meow = function() {
	return this.name ? "Meow name is " + this.name : "I don't have a name. Meow.";
}

const Kitten = mongoose.model('Kitten', kittySchema);

module.exports = { Kitten };
