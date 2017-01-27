const assert = require('assert');
const fs = require('fs');
const run = require('./run.js');
const dataObj = require('../lib/data.js');

describe('testing for data manipulation and configuration', function() {
    it('create data object for storing in database', function() {
        const data = { name: 'steve', color: 'blue' };
        const output = dataObj.createDataObj(data);
        assert.equal(output.name, 'steve');
        assert.equal(output.color, 'blue');
    });
});