/* jshint node:true */

'use strict';

var superstatic = require('superstatic/lib/server');
var Promise = require('rsvp').Promise;

module.exports = function(opt) {
  return require('./build-dist')(opt)
    .then(function() {
      return require('./get-environment')();
    })
    .then(function(env) {
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
    });
};

