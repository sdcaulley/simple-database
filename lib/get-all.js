const fs = require('fs');

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

module.exports = {
    getAll
};