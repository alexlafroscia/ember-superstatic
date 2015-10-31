/* jshint node:true */

'use strict';

// Whatever is returned from this function will be used as the environment
// provided to your Ember app.  It can either be hard-coded strings, imported
// through a JS module, or grabbed from the environment using:
//
//     var foo = process.env.FOO
//
// This file will always be used when doing development.  It will also be used
// during production if you serve the application using
//
//     ember superstatic
//
// If you are using some othe method to provide your production environment,
// then this configuration will not be applied.
module.exports = (function() {
  var greeting = 'hello, world';
  return {
    GREETING: greeting
  };
})();
