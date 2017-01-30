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

function createArguments(data) {
    data.forEach(function(item) {
        const collection = item.directory + '/' + item.collection;
        const id = item._id;
        return {
            collection,
            id
        };
    });
}

module.exports = {
    createDataObj,
};