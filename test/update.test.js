const update = require('../lib/update.js');
const assert = require('assert');

describe('update a record', function() {
    it('update a record', function(done) {
        //grade originally said 'A'
        const output = update.update('students/spanish', { database: 'students', collection: 'spanish', name: 'Suzie', grade: 'C', _id: 'XYZ789' }, function(err, data) {
            assert.deepEqual(data, { database: 'students', collection: 'spanish', name: 'Suzie', grade: 'C', _id: 'XYZ789' });
            done();
        });

    });

    it('update creates error if no id on object', function() {
        const output = update.update('students/spanish', { database: 'students', collection: 'spanish', name: 'Suzie', grade: 'A' });
        assert.equal(output, 'Record has no unique identifier.');
    });
});