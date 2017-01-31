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

    before(done => {
        server.start({ baseDir: testDir, port: port }, () => { done(); });
    });

    after(done => {
        client.end(done);
        server.stop();
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
});