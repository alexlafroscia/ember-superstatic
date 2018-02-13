'use strict';

var superstatic = require('superstatic');
var getEnvironment = require('./lib/tasks/get-environment');

module.exports = {
  name: 'superstatic',

  serverMiddleware: function(config) {
    config.app.use(superstatic({
      env: getEnvironment()
    }));
  },

  contentFor: function(type) {
    if (type === 'head') {
      return "<script src='/__/env.js'></script>";
    }
  },

  includedCommands: function() {
    return require('./lib/commands');
  }
};
