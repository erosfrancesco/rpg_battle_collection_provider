const fs   = require("fs");
const path = require("path");
const json = require("../logic/json.js");

const EXTENSION = '.json';


/* read */
	const read = (dir, callback) => {
		try {
			listJSONs(dir, async (err, files) => {
				const data = [];
				const indexTable = {};

				for (const file of files) {
					const pathToFile = path.join(dir, file);
					indexTable[pathToFile] = data.length;
					const content = await fs.readFileSync(pathToFile);
					json.decode(content).forEach(datum => data.push(datum) );
				}

				callback(null, {data, indexTable});
			});
		}catch (err) {
			callback(err);
		}
	} 


	const listJSONs = (dir, callback) => fs.readdir(dir, (err, files) => {
		if (err) {
			callback(err);
			return;
		}

		callback(null, filterJSONs(files) );
	});

	const filterJSONs = files => files.filter(file => path.extname(file).toLowerCase() === EXTENSION );
/**/


module.exports = read;