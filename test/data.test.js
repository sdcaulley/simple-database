const assert = require('assert');
const fs = require('fs');
const findRemove = require('find-remove');
const dataObj = require('../lib/data.js');
const create = require('../lib/create.js');
const testData = require('./test-data');


describe('testing for data manipulation and configuration', function() {
    const testDir = './db-program';

    before(() => {
        if (fs.existsSync(testDir)) {
            findRemove(testDir, { dir: '*', files: '*.*' });
            fs.rmdirSync(testDir);
        }

        function testSave(data) {
            data.forEach(function(item) {
                if (item._id) {
                    create.createDBDir(item);
                } else {
                    const newObj = dataObj.createDataObj(item);
                    create.createDBDir(newObj);
                }
            });
        }
        create.createProgramDir();
        testSave(testData);
    });

    it('create data object for storing in database', function() {
        const output = dataObj.createDataObj({ name: 'steve', grade: 'B' });
        assert.equal(output.name, 'steve');
        assert.equal(output.grade, 'B');
    });
});