const simpleid = require('simpleid');

function DataObj(data) {
    for (var keys in data) {
        this[keys] = data[keys];
        this._id = simpleid();
    }
}

function createDataObj(data) {
    return new DataObj(data);
}

function getCollection(data) {
    data.forEach(function(item) {
        return item.collection;
    });
}

module.exports = {
    createDataObj,
    getCollection
};