'use strict';

const path = require('path');

function attemptRequire(fileName) {
  var obj;
  try {
    obj = require(fileName);
  } catch (e) {
    obj = {};
  }
  return obj;
}

module.exports = function(project) {
  const configPath = path.resolve(project.root, 'config/superstatic.js');
  const env = attemptRequire(configPath);

  if (typeof env === 'function') {
    return env();
  }

  return env;
};
