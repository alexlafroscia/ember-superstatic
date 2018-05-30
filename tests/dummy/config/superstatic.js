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
 */
module.exports = function() {
  return {
    env: {
      GREETING: process.env.GREETING || 'Hello, world!'
    }
  };
};
