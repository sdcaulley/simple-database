const simpleid = require('simpleid');
const create = require('./create.js');

function DataObj(data) {
    for (var keys in data) {
        this[keys] = data[keys];
        this._id = simpleid();
    }
}

function createDataObj(data) {
    return new DataObj(data);
}

function arrayData(data) {
    const array = [];
    data.map(function(item) {
        array.push(createDataObj(item));
    });
    return array;
}

function save(data) {
    const newData = arrayData(data);
    newData.forEach(function(item) {
        create.createDBDir(item, create.createCollection);
    });
}

function runProgram(data) {
    create.createProgramDir(data, save);
}

module.exports = {
    runProgram,
    createDataObj
};