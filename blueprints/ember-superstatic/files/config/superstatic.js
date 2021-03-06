/* eslint-env node */

'use strict';

/**
 * This file configures SuperStatic
 *
 * The main property that you'll want to alter is the `env` property in the
 * returned object.
 *
 * The environemnt returned from here will be made available to your application
 * through:
 *
 *   import env from 'superstatic/env';
 *
 * The function to generate the configuration is passed an `environment` variable
 * that corresponds to the matching Ember environment. When running
 * `ember superstatic` the value will always be `production`.
 *
 */
module.exports = function(/* environment */) {
  return {
    env: {
      GREETING: process.env.GREETING || 'Hello, world!'
    }
  };
};
