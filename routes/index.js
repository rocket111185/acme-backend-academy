'use strict';

const { basename } = require('path');
const { readdirSync } = require('fs');

const currentDirectory = basename(__dirname);
const currentFile = basename(__filename);

const files = readdirSync(currentDirectory).filter(
  (file) => file !== currentFile
);

module.exports = (app) => {
  for (const file of files) {
    app.use('/', require(`./${file}`));
  }
};
