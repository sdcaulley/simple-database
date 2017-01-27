const fs = require('fs');
const simpleid = require('simpleid');

const DataObj(name, color) {
    this._id = simpleid();
    this.name = name;
    this.color = color;
}

function writeData() {

}

module.exports = {
    save: writeData
}