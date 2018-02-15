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
    },
    {
      name: 'compression',
      aliases: ['c'],
      type: Boolean,
      default: false,
      description: 'Enable compression'
    }
  ],

  run(commandOptions) {
    const outputDirectory = path.resolve(this.project.root, 'dist');

    if (!fs.existsSync(outputDirectory)) {
      throw new Error(
        'Project must be built before serving; please run `ember build`'
      );
    }

    const superstaticConfig = Object.assign({}, commandOptions, {
      config: {
        cwd: this.project.root,
        public: 'dist'
      },
      env: getEnvironment(this.project)
    });

    return require('../tasks/server')(superstaticConfig, log => {
      this.ui.write(log, 'INFO');
    });
  }
};
