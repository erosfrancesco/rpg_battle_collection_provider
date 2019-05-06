const fs   = require("fs");
const path = require("path");
const json = require("../logic/json.js");
const read = require("./read.js");


const MAX_CHUNK_LENGTH = 5;


// write
const write = (dir, item, callback) => read(dir, (err, res) => {
	if (err) {
		callback(err);
		return;
	}

	computeChunkFile(dir, res, (err, file) => {
		if (err) {
			callback(err);
			return;
		}

		json.write(file, item, callback);
	});
});


const computeChunkFile = (dir, {data, indexTable}, callback) => {

	const numberOfChunks = Object.keys(indexTable).length - 1;
	const lastChunkFile = Object.keys(indexTable)[numberOfChunks];
	const lastChunkIndex = indexTable[lastChunkFile];
	
	if ( data.length - 1 <= numberOfChunks * MAX_CHUNK_LENGTH ) {
		callback(null, lastChunkFile);
		return
	}

	const file = path.join(dir, "chunk-" + (numberOfChunks + 1) + ".json");
	json.createFile(file, err => {
		if(err) {
			callback(err);
			return
		}

		callback(null, file)
	});
};


module.exports = write;