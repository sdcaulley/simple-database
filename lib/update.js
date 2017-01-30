const get = require('./lib/get.js');

function update(collection, obj) {
    if (!obj._id) {
        conosle.log('Record has no unique identifier.');
    } else {
        const path = './db-program/' + obj.database + '/' + obj.collection
    }
}

module.exports = {
    update
};