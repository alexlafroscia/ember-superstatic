'use strict';

const path = require('path');
const fs = require('fs');

const RSVP = require('rsvp');
const superstatic = require('superstatic').server;
const getConfig = require('../read-config-file');

const log = require('debug')('ember-superstatic:server-command');

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

    const superstaticConfig = Object.assign(
      {},
      getConfig(this.project, 'production'),
      commandOptions,
      {
        cwd: this.project.root,
        config: {
          public: 'dist'
        }
      }
    );

    log('Starting server with config: %o', superstaticConfig);

    const app = superstatic(superstaticConfig);

    this._server = app.listen(() => {
      this.ui.writeInfoLine(
        `Superstatic server started on port ${superstaticConfig.port}`
      );
    });

    this._keepAlive = RSVP.defer();

    return this._keepAlive.promise;
  },

  onInterrupt() {
    // Kill the Superstatic server
    if (this._server) {
      this._server.close();
    }

    // Allow the Ember process to die
    if (this._keepAlive) {
      this._keepAlive.resolve();
    }
  }
};
