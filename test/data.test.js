const assert = require('assert');
const fs = require('fs');
const findRemove = require('find-remove');
const dataObj = require('../lib/data.js');
const testData = require('./test-data');


describe('testing for data manipulation and configuration', function() {
    const testDir = './db-program';

    before(() => {
        if (fs.existsSync(testDir)) {
            findRemove(testDir, { dir: '*', files: '*.*' });
            fs.rmdirSync(testDir);
        }
    });

    it('create data object for storing in database', function() {
        const output = dataObj.createDataObj({ name: 'steve', grade: 'B' });
        assert.equal(output.name, 'steve');
        assert.equal(output.grade, 'B');
    });

});