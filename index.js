'use strict';

const superstaticMiddleware = require('superstatic');

const getConfig = require('./lib/read-config-file');
const superstaticCommand = require('./lib/commands/superstatic');

module.exports = {
  name: 'ember-superstatic',

  serverMiddleware(config) {
    config.app.use(
      superstaticMiddleware(getConfig(this.project, config.options.environment))
    );
  },

  contentFor(type) {
    if (type === 'head') {
      return "<script src='/__/env.js'></script>";
    }
  },

  includedCommands() {
    return {
      superstatic: superstaticCommand
    };
  },

  included(app) {
    this._super.apply(this, arguments);

    app.import('vendor/shims/superstatic-env.js');
  }
};
