const assert = require('assert');
const getAll = require('../lib/get-all.js');

describe('get-all lists all records in a collection', function() {
    it('get-all list all records in a collection', function(done) {
        const output = getAll.getAll('pets/dogs', function(err, results) {
            assert.equal(results.length, 2);
            done();
        });
    });
});