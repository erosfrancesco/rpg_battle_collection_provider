const resourceDir = require("../src/index.js");
const config = require("../config");


// helper
const getResourceDir = category => config.folders.categories[category];

// read
const fetchCategories = () => Object.keys(config.folders.categories);
const fetchResourceCategory = (category, callback) => {
    const path = getResourceDir(category);
    if (!path) {
        callback("No resource named", category);
        return;
    }

    resourceDir.read(path, (err, res) => callback(err, (err ? null : res.data)) );
}

// write
const writeResourceCategory = (category, item, callback) => {
    const path = getResourceDir(category);
    if (!path) {
        callback("No resource named", category);
        return;
    }
    resourceDir.write(path, item, callback);
}

// update
const patchResourceCategory = (category, index, item, callback) => {
    const path = getResourceDir(category);
    if (!path) {
        callback("No resource named", category);
        return;
    }
    resourceDir.update(path, item, Number(index), callback);
}

// delete
const deleteResourceCategory = (category, index, callback) => {
    const path = getResourceDir(category);
    if (!path) {
        callback("No resource named", category);
        return;
    }
    resourceDir.delete(path, Number(index), callback);
}


module.exports = {
    fetchCategories,
    fetchResourceCategory,
    writeResourceCategory,
    patchResourceCategory,
    deleteResourceCategory
}