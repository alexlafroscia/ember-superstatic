'use strict';

const path = require('path');
const log = require('debug')('ember-superstatic:read-config-file');

module.exports = function(project, environment) {
  // File is assumed to be in `APP_ROOT/config/superstatic.js`
  const configPath = path.join(
    path.dirname(project.configPath()),
    'superstatic.js'
  );

  let config = require(configPath);
  if (typeof config === 'function') {
    config = config(environment);
  }

  log('Using Superstatic configuration: %o', config);

  return config;
};
