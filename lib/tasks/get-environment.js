/* jshint node:true */

'use strict';

var path = require('path');
var configFiles = ['.env.json', 'env.json', '.env.js', 'env.js'];
var dirname = process.cwd();

function attemptRequire(fileName) {
  var obj;
  try {
    obj = require(path.join(dirname, fileName));
  } catch(e) {
    obj = {};
  }
  return obj;
}

module.exports = function(file) {
  if (file) {
    return attemptRequire(file);
  } else {
    return configFiles.reduce(function(prev, fileName) {
      var config = attemptRequire(fileName);
      for (var key in config) {
        prev[key] = config[key];
      }
      return prev;
    }, {});
  }
};
