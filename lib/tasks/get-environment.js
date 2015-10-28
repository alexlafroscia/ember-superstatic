/* jshint node:true */

'use strict';

var RSVP = require('rsvp');
var readFile = RSVP.denodeify(require('fs').readFile);
var PREFIX = 'SUPERSTATIC_';

module.exports = function() {
  return readFile('.env.json', 'utf8')
    // Start out with the environment defined in the file
    .then(function(data) {
      return JSON.parse(data);
    }, function() {
      return {};
    })
    // Try to look up the exact keys in the environment to override the existing
    // values
    .then(function(env) {
      var keys = Object.keys(env);
      keys.forEach(function(key) {
        var value = process.env[key];
        if (value) {
          env[key] = value;
        }
      });
      return env;
    })
    // Look up any keys that may exist in the environment that are prefixed
    // correctly and add those to the environment as well
    .then(function(env) {
      var keys = Object.keys(process.env);
      keys.forEach(function(key) {
        if (key.indexOf(PREFIX) >= 0) {
          var stripped = key.substring(PREFIX.length);
          env[stripped] = process.env[key];
        }
      });
      return env;
    });
};
