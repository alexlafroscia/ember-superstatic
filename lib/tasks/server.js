'use strict';

const superstatic = require('superstatic/lib/server');

module.exports = function(opt) {
  // Start up the Superstatic server with the configration provided
  const app = superstatic({
    port: opt.port,
    host: opt.host,
    config: {
      root: 'dist/'
    },
    debug: opt.debug,
    env: opt.env
  });

  // Start the application inside a Promise that will never resolve, so that Ember does not kill the process
  return new Promise(() => {
    app.listen(() => {
      this.ui.write('Superstatic server started on port ' + opt.port, 'INFO');
    });
  });
};
