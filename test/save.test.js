const assert = require('assert');
const saveData = require('../lib/save.js');

describe('save creates a new record', function() {
    it('save checks for _id and throws and error', function(done) {
        saveData.save('spanish', { name: 'steve', grade: 'B', _id: 'JKL456' }, function(err) {
            assert.equal(err, 'This record has an id.');
            done();
        });

    });

    it('save creates new document when there is no _id', function(done) {
        saveData.save('spanish', { database: 'students', collection: 'spanish', name: 'steve', grade: 'B' }, function(output) {
            assert.equal(output.name, 'steve');
            assert.equal(output.database, 'students');
            done();
        });
    });
});