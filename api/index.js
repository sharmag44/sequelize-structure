'use strict';
const fs = require('fs');
const path = require('path');

const basename = path.basename(module.filename);

let initApi = () => {
    let api = {};
    fs.readdirSync(__dirname)
        .filter((file) => {
            return file.indexOf('.') !== 0 && file !== basename;
        })
        .forEach((file) => {
            const model = require(path.join(__dirname, file));
            const fileName = file.split('.')[0]
            api[fileName] = model;
        });
    return api
}

module.exports = initApi();