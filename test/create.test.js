const assert = require('assert');
const fs = require('fs');
const run = require('./run.js');
const simpleDB = require('../lib/create.js');
const dataObj = require('../lib/data.js');

describe('create operations for database', function() {
    it('create database', function() {
        const testDir = 'db-test-dir';
        const db = simpleDB.createDB(testDir);

        before(done => {
            fs.rmdirSync(testDir);
            db();
        });


    });

    it('create data object for storing in database', function() {
        const data = { name: 'steve', color: 'blue' };
        const output = dataObj.createDataObj(data);
        assert.equal(output.name, 'steve');
        assert.equal(output.color, 'blue');
    });
});