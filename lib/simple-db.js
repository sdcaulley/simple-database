const fs = require('fs');
const dataObj = require('./data.js');

function get(collection, id, callback) {
    const file = './db-program/' + collection + '/' + id + '.json';

    if (id) {
        fs.readFile(file, 'utf8', function(err, data) {
            if (err) {
                callback(err);
            } else {
                const fileConts = JSON.parse(data);
                callback(null, fileConts);
            }
        });
    } else {
        const message = 'There is no id provided.';
        callback(message);
    }
}

function getAll(collection, callback) {
    const path = './db-program/' + collection;

    fs.readdir(path, (err, files) => {
        if (err) return callback(err);
        const results = [];
        let count = files.length;
        files.forEach(function(item) {
            let newPath = path + '/' + item;
            fs.readFile(newPath, 'utf8', function(err, data) {
                if (err) {
                    callback(err);
                }
                let strData = JSON.parse(data);
                results.push(strData);
                count--;

                if (!count) {
                    callback(null, results);
                }
            });
        });
    });
}

function remove(collection, id, callback) {
    //returns number of files removed
    const path = './db-program/' + collection + '/' + id + '.json';
    fs.unlink(path, function(err, succ) {
        if (err) {
            callback(err);
        }
        if (!succ) {
            callback(null, 1);
        }
    });
}

function save(collection, obj, callback) {
    if (obj._id) {
        const err = 'This record has an id.';
        callback(err);
    } else {
        const newObj = dataObj.createDataObj(obj);
        callback(newObj);
    }
}

function update(collection, obj, callback) {
    const file = './db-program/' + collection + '/' + obj._id + '.json';
    if (!obj._id) {
        return 'Record has no unique identifier.';
    } else {
        const newData = JSON.stringify(obj);
        fs.writeFileSync(file, newData);
        callback(null, obj);
    }
}

module.exports = {
    get,
    getAll,
    remove,
    save,
    update
};