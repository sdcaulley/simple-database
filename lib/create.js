const fs = require('fs');
const mkdirp = require('mkdirp');

function createProgramDir() {
    if (!fs.existsSync('./db-program')) {
        fs.mkdirSync('./db-program');
    }
}

function createDBDir(obj) {
    const path = './db-program/' + obj.database;
    if (!fs.existsSync(path)) {
        fs.mkdir(path, function() {
            createCollection(obj);
        });
    }
    createCollection(obj);
}

function createCollection(obj) {
    const path = './db-program/' + obj.database + '/' + obj.collection;
    if (!fs.existsSync(path)) {
        fs.mkdir(path, function() {
            createDocument(obj);
        });
    }
    createDocument(obj);
}

function createDocument(obj) {
    let path = './db-program/' + obj.database + '/' + obj.collection + '/';
    if (!fs.existsSync(path + obj._id + '.json')) {
        path += obj._id + '.json';
        const strObj = JSON.stringify(obj);
        fs.writeFile(path, strObj, function(err) {
            if (err) throw err;
        });
    }
}

module.exports = {
    createProgramDir,
    createDBDir
};