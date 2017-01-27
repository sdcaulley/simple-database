const fs = require('fs');

function createDB(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync('./' + directory);
    }
}

function createCollection() {

}

module.exports = {
    createDB,
    createCollection
};