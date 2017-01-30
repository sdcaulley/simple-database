const create = require('./lib/create.js');
const dataObj = requier('./lib/data.js');
const testData = require('./test/test-data.json');

function runProgram(data) {
    create.createProgramDir(data, dataObj.getCollection);
}

runProgram(testData);