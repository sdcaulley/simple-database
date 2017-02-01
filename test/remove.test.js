const assert = require('assert');
const remove = require('../lib/remove.js');

describe('remove deletes the record associated with and id', function() {
    it('checks to see if record is removed', function(done) {
        remove.remove('students/spanish', 'XYZ789', function(err, output) {
            assert.equal(output, 1);
            done();
        });

    });
});