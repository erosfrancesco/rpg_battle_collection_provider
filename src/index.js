const {read, update} = require("./update.js");
const remove = require("./delete.js");
const write = require("./write.js");

// CRUD


// TEST
//read("./actions", console.log)
//write("./actions", {"foo": true}, (err) => console.log(err));
//update("./actions", {"foo": true}, 2, console.log);

module.exports = {
	read,
	write,
	update,
	delete: remove
};