const assert = require('assert');
const fs = require('fs');
const run = require('./run.js');
const simpleDB = require('../lib/create.js');

describe('create operations for database', function() {
    const testDir = 'db-test-dir';

    before(() => {
        if (fs.existsSync('./' + testDir)) {
            fs.rmdirSync('./' + testDir);
        }
        simpleDB.createDB(testDir);
    });

    it('create database', function() {


    });
});