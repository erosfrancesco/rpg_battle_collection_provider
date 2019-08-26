//const mongoose = require("mongoose");

const actions = require("./actions");
const actors = require("./actors");
const ai = require("./ai");
const animations = require("./animations");
const battles = require("./battles");
const commands = require("./commands");
const objects = require("./objects");
const sprites = require("./sprites");


const groups = require("./groups");

/*
const kittySchema = new mongoose.Schema({name: String});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function() {
	const greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
	console.log(greeting);
}

const Kitten = mongoose.model('Kitten', kittySchema);
/**/

module.exports = { 
	actions,
	actors,
	ai,
	animations,
	battles, 
	commands, 
	objects,
	sprites,
	
	groups
};
