const assert = require('assert');
const fs = require('fs');
const findRemove = require('find-remove');
const dataObj = require('../lib/data.js');
const create = require('../lib/create.js');
const saveData = require('../lib/save.js');
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

    it('save checks for _id and throws and error', function() {
        const output = saveData.save('spanish', { name: 'steve', grade: 'B', _id: 'JKL456' }, dataObj.createDataObj);
        assert.equal(output, 'This record has an id.');
    });

    it('save creates new document when there is no _id', function() {
        const output = saveData.save('spanish', { database: 'students', collection: 'spanish', name: 'steve', grade: 'B' }, create.createDBDir);
        assert.equal(output.name, 'steve');
        assert.equal(output.database, 'students');
    });
});