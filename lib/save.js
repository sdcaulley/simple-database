const dataObj = require('./data.js');

function save(collection, obj, callback) {
    if (obj._id) {
        const err = 'This record has an id.';
        return err;
    } else {
        const newObj = dataObj.createDataObj(obj);
        callback(newObj);
        return newObj;
    }
}

module.exports = {
    save
};