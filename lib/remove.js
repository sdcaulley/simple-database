const fs = require('fs');

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

module.exports = {
    remove
};