const assert = require('assert');
const fs = require('fs');
const findRemove = require('find-remove');
const testData = require('./test-data');
const dataObj = require('../lib/data.js');


describe('testing for data manipulation and configuration', function() {
    const testDir = './db-program';

    before(() => {
        if (fs.existsSync(testDir)) {
            findRemove(testDir, { dir: '*', files: '*.*' });
            fs.rmdirSync(testDir);
        }
    });

    it('create data object for storing in database', function() {
        const output = dataObj.createDataObj(testData);
        assert.equal(output.name, 'steve');
        assert.equal(output.grade, 'B');
    });

    it('e2e test of initial document creation', function() {
        const output = dataObj.runProgram(testData);
        assert.equal(output.name, 'steve');
        assert.equal(output.grade, 'B');
    });
});