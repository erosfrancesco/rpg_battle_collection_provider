const fs = require('fs');
const config = require('../config');


const listDirFiles = (dir, callback) => fs.readdir(dir, (err, direns) => {

    if (err) {
        callback(err);
        return;
    }

    const files = [];
    direns.forEach(item => {
        // filter out the dirs
        if (item === ".DS_Store") {
            return;
        }

        files.push(item)
    });

    callback(null, files);
});


module.exports = listDirFiles;