/* jshint node:true */

'use strict';

var superstatic = require('superstatic/lib/server');
var RSVP = require('rsvp');
var Promise = RSVP.Promise;

module.exports = function(opt) {
  var app = superstatic({
    port: opt.port,
    host: opt.host,
    config: {
      root: 'dist/'
    },
    debug: opt.debug
  });

  return new Promise(function() {
    app.listen(function() {
      console.log('Superstatic server started on port ' + opt.port);
    });
  });
};

