const fs = require('fs');

function doesExist(path) {
    fs.existsSync(path);
}

function createPath() {
    var path;
    process.argv.forEach(function(item) {
        if (item.includes('--database')) {
            path = item.split(':');
            path = path[1];
        }
        if (item.includes('--file')) {
            var file = item.split(':');
            path += '/' + file[1];
        }
    });
    return path;
}

function createDir(path) {
    fs.mkdirSync(path);
}

function whatType(path) {
    var type = path.split('/');

    console.log('type: ', type);
    if (type[1]) {
        createDir(type[0]);
        createDoc(path);
    } else {
        createDir(path);
    }
}

function createDoc(path) {
    fs.writeFileSync(path);
}

function createDB() {
    var path = createPath();
    var exits = doesExist(path);
    whatType(path);
}

module.exports = createDB;