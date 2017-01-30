const assert = require('assert');
const getTest = require('../lib/get.js');

describe('get reads the contents of a record', function() {
    it('read contents of record', function(done) {
        const output = getTest.get('pets/dogs', 'ABC123', function(err, data) {
            assert.deepEqual(data, { database: 'pets', collection: 'dogs', owner: 'Mike', petName: 'Tux', _id: 'ABC123' });
            done();
        });

    });
});