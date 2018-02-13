'use strict';

const superstatic = require('superstatic');
const getEnvironment = require('./lib/tasks/get-environment');

module.exports = {
  name: 'superstatic',

  serverMiddleware(config) {
    config.app.use(
      superstatic({
        env: getEnvironment(this.project)
      })
    );
  },

  contentFor(type) {
    if (type === 'head') {
      return "<script src='/__/env.js'></script>";
    }
  },

  includedCommands() {
    return require('./lib/commands');
  }
};
