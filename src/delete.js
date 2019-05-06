const fs   = require("fs");
const path = require("path");
const json = require("../logic/json.js");
const {read, computeFileIndex} = require("./update.js");



// delete
const remove = (dir, index, callback) => read(dir, (err, res) => {
	if (err) {
		callback(err);
		return;
	}

	const {file, fileIndex} = computeFileIndex(dir, res, index);
	if (!file) {
		callback("no index found on resource");
		return;
	}

	json.delete(file, fileIndex, callback);
});


module.exports = remove;