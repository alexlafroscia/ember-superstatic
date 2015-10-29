/* jshint node:true */

'use strict';

module.exports = {
  name: 'superstatic',
  aliases: [
    'superstatic:s',
    'superstatic:serve',
    'superstatic:server'
  ],
  description: 'Builds the Ember application and runs a Superstatic server for it',
  works: 'insideProject',

  availableOptions: [
    { name: 'port', aliases: ['p'], type: Number, default: 3474, description: 'The port to run the server on' },
    { name: 'hostname', aliases: ['h'], type: String, default: 'localhost', description: 'The host name to use with the server' },
    { name: 'debug', aliases: ['d'], type: Boolean, default: false, description: 'Enable verbose logging of requests' },
  ],

  run: function(commandOptions) {
    return require('../tasks/server')(commandOptions);
  }
};

