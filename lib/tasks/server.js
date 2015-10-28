/* jshint node:true */

'use strict';

var superstatic = require('superstatic/lib/server');
var RSVP = require('rsvp');
var Promise = RSVP.Promise;
var PREFIX = 'SUPERSTATIC_';

module.exports = function(opt) {
  // Get the keys that start with the prefix and add them to the environment
  var keys = Object.keys(process.env);
  var env = {};
  keys.forEach(function(key) {
    if (key.indexOf(PREFIX) >= 0) {
      var stripped = key.substring(PREFIX.length);
      env[stripped] = process.env[key];
    }
  });

  // Start up the Superstatic server with the configration provided
  var app = superstatic({
    port: opt.port,
    host: opt.host,
    config: {
      root: 'dist/'
    },
    debug: opt.debug,
    env: env
  });

  // Start the application inside a Promise that will never resolve, so that
  // Ember does not kill the process
  return new Promise(function() {
    app.listen(function() {
      console.log('Superstatic server started on port ' + opt.port);
    });
  });
};

