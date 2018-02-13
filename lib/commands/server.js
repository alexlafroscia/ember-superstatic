'use strict';

const path = require('path');
const fs = require('fs');
const getEnvironment = require('../tasks/get-environment');

module.exports = {
  name: 'superstatic',
  description: 'Runs a Superstatic server for your Ember application',
  works: 'insideProject',

  availableOptions: [
    {
      name: 'port',
      aliases: ['p'],
      type: Number,
      default: 3474,
      description: 'The port to run the server on'
    },
    {
      name: 'hostname',
      aliases: ['h'],
      type: String,
      default: 'localhost',
      description: 'The host name to use with the server'
    },
    {
      name: 'debug',
      aliases: ['d'],
      type: Boolean,
      default: false,
      description: 'Enable verbose logging of requests'
    }
  ],

  run(commandOptions) {
    const outputDirectory = path.resolve(this.project.root, 'dist');

    if (!fs.existsSync(outputDirectory)) {
      throw new Error(
        'Project must be built before serving; please run `ember build`'
      );
    }

    return require('../tasks/server').call(
      this,
      Object.assign(commandOptions, {
        env: getEnvironment(this.project)
      })
    );
  }
};
