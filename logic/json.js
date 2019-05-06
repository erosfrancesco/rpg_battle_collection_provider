const fs = require('fs');

const encode = data => JSON.stringify(data, null, 4); 
const decode = data => JSON.parse(data); 

const fetch = (file, callback) => {
    //console.log("reading", file)
    if (!file) {
        callback("No JSON file found: " + file);
        return;
    }

    fs.readFile(file, (err, data) => {
        if (err) {
            console.log("nope", err)
            callback(err);
            return;
        }

        callback(null, data);
    });
}

const write = (file, item, callback) => {   
    fetch(file, (err, data) => {
        if (err) {
            callback(err);
            return;
        }

        const items = decode(data);
        items.push(item || {});
        const content = encode(items);

        fs.writeFile(file, content, err => callback(err, content));
    });
};


const writeOps = (file, ops, callback) => {   
    fetch(file, (err, data) => {
        if (err) {
            callback(err);
            return;
        }

        ops(decode(data), updated => {
            const content = encode(updated);
            fs.writeFile(file, content, err => callback(err, updated));
        })
        
    });
};

const patch = (file, item, index, callback) => {
    fetch(file, (err, data) => {
        if (err) {
            callback("error updating file [reading]" + file + ": " + err)
            return;
        }

        const items = decode(data);
        items[index] = item;
        const content = encode(items);

        fs.writeFile(file, content, err => {
            err ? callback("error updating file [writing]" + file + ": " + err) : callback(null, content);
        });
    });
};

const remove = (file, index, callback) => {
    fetch(file, (err, data) => {
        if (err) {
            callback("error deleting file [reading]" + file + ": " + err)
            return;
        }

        const items = decode(data);
        items.splice(index, 1);
        const content = encode(items);

        fs.writeFile(file, content, err => {
            err ? callback("error deleting file [writing]" + file + ": " + err) : callback(null, content);
        });
    });
};

const createFile = (file, callback) => fs.appendFile(file, '[]', callback);


module.exports = {
    createFile,
    fetch,
    write,
    writeOps,
    patch,
    remove,
    encode,
    decode
};