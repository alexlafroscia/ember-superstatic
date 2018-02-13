/* eslint-env node */

'use strict';

// Whatever is returned from this function will be used as the environment
// provided to your Ember app.  It can either be hard-coded values, imported
// through a JS module, or grabbed from the environment using:
//
//     const foo = process.env.FOO
//
// This file will always be used when doing development.  It will also be used
// during production if you serve the application using
//
//     ember superstatic
//
// Note that you need to be running a superstatic server to get this configuration
// outside of a development environment
module.exports = function() {
  return {
    GREETING: process.env.GREETING || 'Hello, world!'
  };
};
