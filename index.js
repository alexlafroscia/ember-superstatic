/* jshint node: true */
'use strict';

var superstatic = require('superstatic');

module.exports = {
  name: 'superstatic',

  serverMiddleware: function(config) {
    config.app.use(superstatic());
  },

  contentFor: function(type) {
    if (type === 'head') {
      return "<script src='/__/env.js'></script>";
    }
  }
};
