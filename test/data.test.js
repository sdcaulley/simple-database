const assert = require('assert');
const dataObj = require('../lib/data.js');


describe('testing for data manipulation and configuration', function() {

    it('create data object for storing in database', function() {
        const output = dataObj.createDataObj({ name: 'steve', grade: 'B' });
        assert.equal(output.name, 'steve');
        assert.equal(output.grade, 'B');
    });
});