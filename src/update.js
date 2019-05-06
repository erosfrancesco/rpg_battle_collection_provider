const fs   = require("fs");
const path = require("path");
const json = require("../logic/json.js");
const read = require("./read.js");


// update
const update = (dir, item, index, callback) => read(dir, (err, res) => {
	if (err) {
		callback(err);
		return;
	}

	const {file, fileIndex} = computeFileIndex(dir, res, index);

	if (!file) {
		callback("no index found on resource");
		return;
	}

	json.patch(file, item, fileIndex, callback);
});


const computeFileIndex = (dir, {indexTable}, index) => {
	let file = false;
	let fileIndex = 0;

	const files = Object.keys(indexTable);

	/*
	if (files.length === 1) {
		file = files[0];
		return {file, fileIndex}
	}
	/**/

	const i = (files.length > 1) ? files.findIndex(file => indexTable[file] > index ) : 0;
	if (i < 0) {
		return {file, fileIndex};
	}
	const fromIndex = indexTable[ files[ i - 1 ] ] || 0;
	file = files[i - 1] || files[0];
	fileIndex = index - fromIndex;

	return {file, fileIndex};
};


module.exports = {update, read, computeFileIndex};