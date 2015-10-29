/* jshint node:true */

'use strict';

var RSVP = require('rsvp');
var Promise = RSVP.Promise;
var exec = require('child_process').exec;

function buildEmberApp(opt) {
  return new Promise(function(resolve, reject) {
    console.log('Starting Ember ' + opt.environment + ' build');
    exec('ember build --environment ' + opt.environment, function(err, stdout, stderr) {
      if (err) {
        return reject(stderr);
      }

      console.log('Finished Ember build');
      resolve(stdout);
    });
  });
}

module.exports = function(opt) {
  if (opt.withBuild) {
    return buildEmberApp(opt);
  } else {
    return RSVP.resolve();
  }
};
