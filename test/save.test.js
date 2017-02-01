const assert = require('assert');
const saveData = require('../lib/save.js');
const create = require('../lib/create.js');
const dataObj = require('../lib/data.js');


it('save checks for _id and throws and error', function() {
    const output = saveData.save('spanish', { name: 'steve', grade: 'B', _id: 'JKL456' }, dataObj.createDataObj);
    assert.equal(output, 'This record has an id.');
});

it('save creates new document when there is no _id', function() {
    const output = saveData.save('spanish', { database: 'students', collection: 'spanish', name: 'steve', grade: 'B' }, create.createDBDir);
    assert.equal(output.name, 'steve');
    assert.equal(output.database, 'students');
});