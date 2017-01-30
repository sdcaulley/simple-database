const fs = require('fs');
const update = require('./update.js');

function createProgramDir(data, callback) {
    if (!fs.existsSync('./db-program')) {
        fs.mkdir('./db-program', function() {
            callback(data);
        });
    }
    callback(data);
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
    } else {
        update.update(obj, path + obj._id + '.json');
    }
}

module.exports = {
    createProgramDir,
    createDBDir
};