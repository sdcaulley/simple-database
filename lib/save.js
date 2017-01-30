const dataObj = require('./data.js');

function save(collection, obj, callback) {
    if (obj._id) {
        console.log('This record has an id.');
    } else {
        const newObj = dataObj.createDataObj(obj);
        callback();
        return newObj;
    }
}

module.exports = save;