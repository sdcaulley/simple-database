const fs = require('fs-promise');
const dataObj = require('./data');
const create = require('./create');

function getAll(collection) {
    const path = './db-program/' + collection;

    fs.readdir(path)
        .then(files => {
            const array = files.map(item => {
                return path + '/' + item;
            });
            return array;
        })
        .then(data => {
            const promises = data.map(file => fs.readFile(file, 'utf8'));
            return Promise.all(promises);
        })
        .then(results => {
            const final = results.map(item => {
                return JSON.parse(item);
            });
            return final;
        })
        .catch(err => { return err; });
}

function get(collection, id) {
    const file = './db-program/' + collection + '/' + id + '.json';

    fs.readFile(file, 'utf8')
        .then(data => {
            const result = JSON.parse(data);
            return result;
        })
        .catch(err => {
            return err;
        });
}

function remove(collection, id) {
    //returns number of files removed
    const path = './db-program/' + collection + '/' + id + '.json';

    fs.unlink(path)
        .then(() => 1)
        .catch(err => {
            console.log('fail: ',
                err);
        });
}

function save(collection, obj, callback) {
    const path = collection.split('/');

    obj.database = path[0];
    obj.collection = path[1];

    if (obj._id) {
        const err = 'This record has an id.';
        callback(err);
    } else {
        const newObj = dataObj.createDataObj(obj);
        create.createDBDir(newObj);
        callback(null, newObj);
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
    getAll,
    get,
    remove,
    save,
    update
};