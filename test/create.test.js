const assert = require('assert');
const run = require('./run.js');
const createDB = require('../lib/create.js');

describe('create operations for database', function() {
    it('create path to database', function() {
        var output = run(['cli.js', '--database:test']);
        assert.equal(output, 'This file does not exist');
    });
});