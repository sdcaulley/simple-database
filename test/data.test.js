const assert = require('assert');
const fs = require('fs');
const findRemove = require('find-remove');
const dataObj = require('../lib/data.js');
const create = require('../lib/create.js');
const testData = require('./test-data');
const simpleDB = require('../lib/simple-db');

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
                    create.createDBDir(dataObj.createDataObj(item));
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

describe('get-all lists all records in a collection', function() {
    it('get-all list all records in a collection', function(done) {
        simpleDB.getAll('pets/dogs', function(err, results) {
            assert.equal(results.length, 2);
            done();
        });
    });
});

describe('get reads the contents of a record', function() {
    it('read contents of record', function(done) {
        simpleDB.get('pets/dogs', 'ABC123', function(err, data) {
            assert.deepEqual(data, { database: 'pets', collection: 'dogs', owner: 'Mike', petName: 'Tux', _id: 'ABC123' });
            done();
        });

    });
});

describe('remove deletes the record associated with and id', function() {
    it('checks to see if record is removed', function(done) {
        simpleDB.remove('students/spanish', 'XYZ789', function(err, output) {
            assert.equal(output, 1);
            done();
        });

    });
});

describe('save adds a new record to the database', () => {
    it('save checks for _id and throws and error', function() {
        const output = simpleDB.save('spanish', { name: 'steve', grade: 'B', _id: 'JKL456' }, dataObj.createDataObj);
        assert.equal(output, 'This record has an id.');
    });

    it('save creates new document when there is no _id', function() {
        const output = simpleDB.save('spanish', { database: 'students', collection: 'spanish', name: 'steve', grade: 'B' }, create.createDBDir);
        assert.equal(output.name, 'steve');
        assert.equal(output.database, 'students');
    });
});

describe('update a record', function() {
    it('update a record', function(done) {
        //grade originally said 'A'
        simpleDB.update('students/spanish', { database: 'students', collection: 'spanish', name: 'Suzie', grade: 'C', _id: 'XYZ789' }, function(err, data) {
            assert.deepEqual(data, { database: 'students', collection: 'spanish', name: 'Suzie', grade: 'C', _id: 'XYZ789' });
            done();
        });

    });

    it('update creates error if no id on object', function() {
        const output = simpleDB.update('students/spanish', { database: 'students', collection: 'spanish', name: 'Suzie', grade: 'A' });
        assert.equal(output, 'Record has no unique identifier.');
    });
});