const fs = require('fs');

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
    update
};