/* jshint node:true */

'use strict';

module.exports = {
  name: 'superstatic',
  description: 'Runs a Superstatic server for your Ember application',
  works: 'insideProject',

  availableOptions: [
    { name: 'port', aliases: ['p'], type: Number, default: 3474, description: 'The port to run the server on' },
    { name: 'hostname', aliases: ['h'], type: String, default: 'localhost', description: 'The host name to use with the server' },
    { name: 'debug', aliases: ['d'], type: Boolean, default: false, description: 'Enable verbose logging of requests' },
    { name: 'with-build', aliases: ['b'], type: Boolean, default: false, description: 'Whether or not to build the application before serving' },
    { name: 'environment', aliases: ['e'], type: String, default: 'production', description: 'The environment to use when building the Ember application' },
    { name: 'file', aliases: ['f'], type: String, description: 'File to use to generate the environment' }
  ],

  run: function(commandOptions) {
    return require('../tasks/server')(commandOptions);
  }
};

