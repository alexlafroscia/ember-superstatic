/* jshint node:true */

'use strict';

module.exports = {
  name: 'superstatic:server',
  aliases: ['superstatic:s'],
  description: 'Builds the Ember application and runs a Superstatic server for it',
  works: 'insideProject',

  availableOptions: [
    { name: 'port', type: Number, default: 3474 },
    { name: 'hostname', type: String, default: 'localhost' },
    { name: 'debug', type: Boolean, default: false }
  ],

  run: function(commandOptions) {
    return require('../tasks/server')(commandOptions);
  }
};

