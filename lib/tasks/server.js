'use strict';

const superstatic = require('superstatic').server;

module.exports = function(opts, log) {
  // Start up the Superstatic server with the configration provided
  const app = superstatic(opts);

  // Start the application inside a Promise that will never resolve, so that Ember does not kill the process
  return new Promise(() => {
    app.listen(() => {
      log(`Superstatic server started on port ${opts.port}\n`);
    });
  });
};
