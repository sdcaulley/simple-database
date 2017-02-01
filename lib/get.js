const fs = require('fs');

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
        callback(null);
    }
}

module.exports = {
    get
};