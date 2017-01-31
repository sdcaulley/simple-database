const assert = require('assert');
const fs = require('fs');
const net = require('net');
const findRemove = require('find-remove');
const server = require('../lib/server.js');
const create = require('../lib/create.js');
const testData = require('./test-data');
const dataObj = require('../lib/data.js');
const testDir = './db-program';
const port = 63000;

describe.only('testing TCP/client relations', () => {
    before(done => {
        findRemove(testDir, { dir: '*', files: '*.*' });
        fs.rmdirSync(testDir);
        done();
    });

    before(done => {

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
        done();
    });

    after(done => {
        client.end(done);
        server.stop();
        done();
    });

    let client;
    before(done => {
        client = net.connect({ port: port }, () => {
            client.setEncoding('utf8');
            done();
        });
    });

    it('client get-all fetches all records in "spanish"', done => {
        //collection, callback
        const message = {
            method: 'getAll',
            collection: 'students/spanish',
        };

        client.once('data', data => {
            const response = JSON.parse(data);
            assert.equal(response.data.length, 2);
            done();
        });

        client.write(JSON.stringify(message));
    });
    it('client get returns record by id', done => {
        //collection, id, callback
        const message = {
            method: 'get',
            collection: 'pets/dogs',
            id: 'ABC123'
        };

        client.once('data', data => {
            const response = JSON.parse(data);
            assert.deepEqual(response.data, { "database": "pets", "collection": "dogs", "owner": "Mike", "petName": "Tux", "_id": "ABC123" });
            done();
        });
        client.write(JSON.stringify(message));
    });

    it('client removes record and returns the number of records removed', done => {
        //collection, id, callback
        const message = {
            method: 'remove',
            collection: 'students/spanish',
            id: 'XYZ789'
        };

        client.once('data', data => {
            const response = JSON.parse(data);
            assert.equal(response.data, 1);
            done();
        });
        client.write(JSON.stringify(message));
    });

    it('client saves a new record in the database', done => {
        //collection, object, callback
        const message = {
            method: 'save',
            collection: 'students/english',
            data: {
                database: 'students',
                collection: 'english',
                name: 'lucy',
                grade: 'A'
            }
        };

        client.once('data', data => {
            const response = JSON.parse(data);
            const saved = response.data;
            assert.ok(saved._id);
            done();
        });

        client.write(JSON.stringify(message));
    });

    it('client updates an already existing record', done => {
        //collection, object, callback
        const message = {
            method: 'update',
            collection: 'pets/dogs',
            data: {
                database: 'pets',
                collection: 'dogs',
                _id: 'ABC123',
                owner: 'Billy',
                petName: 'Tux'
            }
        };
        client.once('data', data => {
            const response = JSON.parse(data);
            assert.deepEqual(response.data, {
                database: 'pets',
                collection: 'dogs',
                _id: 'ABC123',
                owner: 'Billy',
                petName: 'Tux'
            });
            done();
        });
        client.write(JSON.stringify(message));
    });
});